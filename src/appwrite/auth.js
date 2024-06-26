import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

const { appWriteUrl, appProjectId } = conf

export class AuthService{
    client = new Client
    account;

    constructor(){
        this.client
            .setEndpoint(appWriteUrl)
            .setProject(appProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ name, email, password }){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password)
            if (userAccount) {
                this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }){
        try {
            return await this.account.createEmailPasswordSession( email, password )
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}


export const authService = new AuthService

export default authService