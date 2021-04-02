import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FaRegComment } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
import FileLink from '../FileLink'
import LikeButton from '../LikeButton'
import EditPost from './EditPost'

moment.locale('nb')

const Post = ({users, postId, deletePost }) => {

  const [post, setPost] = useState([])

  const [liked, setLiked] = useState(false)

  const { user } = useContext(UserContext)

  useEffect(() => {
    fetch(`https://localhost:44361/posts/${postId}`)
    .then(res => res.json())
    .then(data => setPost(data))
    .catch(console.log)
  }, [liked])


  const editPost = async (post, file) => {
    let formData = new FormData();
    if (file) {
      formData.append('File', file)
      formData.append('postId', post.id)
      formData.append('userId', post.userId)
      const upres = await fetch('https://localhost:44361/UploadDocument', {
        method: 'POST',
        body: formData
      })
      const updata = await upres.json()
      post.documentId = updata.id
    }

    formData = new FormData();
    for (let k in post) {
      formData.append(k, post[k])
    }
    const res = await fetch(`https://localhost:44361/posts/${post.id}`, {
      method: 'PUT',
      body: formData
    })
    const data = await res.json();

    setPost(data)
  }


  return (
    <Card>
        <Card.Body>
          <div className="float-left">
            <p>Postet av <b>{users && users.length && users.find(u => u.id === post.userId)?.username}</b> {moment(post.date).calendar()}</p>
          </div>
          <div className="float-right" hidden={!(user.id === post.userId)}>
            <EditPost post={post} edit={editPost}/> &nbsp;
            <Button variant="danger" size="sm" onClick={deletePost} value={post.id}>Slett</Button>
          </div>
          <Card.Title><br /><br />
            <h2>{post.title}</h2>
          </Card.Title>
          <Card.Text>
            {post.content}
            <br/>
            {post.documentId ? <FileLink fileId={post.documentId} /> : ""}
          </Card.Text>
            <div className="float-right"> 
              {post.like_Count} <LikeButton id={postId} liked={liked} setLiked={setLiked} isPost={true}/>
              {post.comment_Count} <FaRegComment size={18} className="ml-2 mr-2 mb-1"/>  
            </div>
          </Card.Body>
      </Card>
  )
}

export default Post
