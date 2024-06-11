import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featureImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className=''>
            <div className=''>
                <img src={service.getFilePreview(featureImage)} alt={title} className=''/>
            </div>
            <h2>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard