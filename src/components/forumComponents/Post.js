import moment from 'moment'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FaRegComment } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
import FileLink from '../FileLink'
import LikeButton from '../LikeButton'
import EditPost from './EditPost'
import {host} from '../../App'
import SpinnerDiv from './SpinnerDiv'

moment.locale('nb')

const Post = ({users, post, deletePost, commentsLength, setPost }) => {

  const initMount = useRef(true);

  // const [post, setPost] = useState(initPost)

  const [liked, setLiked] = useState(false)

  const { user } = useContext(UserContext)

  // useEffect(() => {
  //   console.log("HEIHEIHEI")
  //   if (initMount.current) {
  //     initMount.current = false
  //   } else {
  //     fetch(`https://localhost:44361/posts/${post.id}`)
  //     .then(res => res.json())
  //     .then(data => setPost(data)) 
  //     .catch(console.log)
  //   }
    
  // }, [liked, commentsLength])


  const editPost = async (post, file) => {
    let formData = new FormData();
    if (file) {
      formData.append('File', file)
      formData.append('postId', post.id)
      formData.append('userId', post.userId)
      const upres = await fetch(host+'UploadDocument', {
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
    const res = await fetch(host+`posts/${post.id}`, {
      method: 'PUT',
      body: formData
    })
    const data = await res.json();

    setPost(post.id, data)
  }

  const updatePostLike = (num) => {
    setPost(post.id, {like_Count: post.like_Count + num})
  }

  // if(post == {}) {
  //   return <SpinnerDiv />
  // }

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
            {post.documentId ? <p><br/>Vedlegg: <b><FileLink fileId={post.documentId} /></b></p>  : ""}
          </Card.Text>
            <div className="float-right"> 
              {post.like_Count} <LikeButton id={post.id} liked={liked} setLiked={setLiked} isPost={true} updatePostLike={updatePostLike}/> &nbsp;
              {post.comment_Count}<FaRegComment size={18} color="grey" className="ml-2 mr-2 mb-1"/>  
            </div>
          </Card.Body>
      </Card>
  )
}

export default Post
