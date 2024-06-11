import conf from '../conf/conf'
import { Client, Databases, Storage, Query, ID } from 'appwrite'

const { appWriteUrl, 
        appProjectId, 
        appWriteDatabaseId, 
        appWriteCollectionId, 
        appWriteBucketId } = conf;

export class Service{
    client = new Client
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(appWriteUrl)
            .setProject(appProjectId);
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredIng, status, userId }){
        try {
            return await this.databases.createDocument(
                appWriteDatabaseId,
                appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredIng,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredIng, status }){
        try {
            return await this.databases.deleteDocument(
                appWriteDatabaseId,
                appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredIng,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                appWriteDatabaseId,
                appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                appWriteDatabaseId,
                appWriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async getPosts(queries = Query.equal["status", "active"]){
        try {
            return await this.databases.getPosts(
                appWriteDatabaseId,
                appWriteCollectionId,
                queries
            )
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }
    
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            appWriteBucketId,
            fileId
        )
    }
}

const service = new Service

export default service;