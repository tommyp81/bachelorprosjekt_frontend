import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { UserContext } from '../../UserContext'
import FileLink from '../FileLink'
import LikeButton from '../LikeButton'
import EditComment from './EditComment'
import {host} from '../../App'

moment.locale('nb')

const Comment = ({users, initComment, deleteComment}) => {

  const initMount = useRef(true);

  const { user } = useContext(UserContext)

  const [comment, setComment] = useState(initComment)
  const [liked, setLiked] = useState(false)

  

  // useEffect( async () => {
  //   if (initMount.current) {
  //     initMount.current = false
  //   } else {
  //     const res = await fetch(`https://localhost:44361/comments/${comment.id}`)
  //     const data = await res.json();
  //     setComment(data)
  //   }
  // }, [liked])

  const editComment = async (comment, file) => {
    let formData = new FormData()
    if (file) {
      formData.append('File', file)
      formData.append('commentId', comment.id)
      formData.append('userId', comment.userId)
      const upres = await fetch(host+'UploadDocument', {
        method: 'POST',
        body: formData
      })
      const updata = await upres.json()
      comment.documentId = updata.id
    }

    formData = new FormData()
    for (let k in comment) {
      formData.append(k, comment[k])
    }
    const res = await fetch(host+`comments/${comment.id}`, {
      method: 'PUT',
      body: formData
    })
    const data = await res.json();

    setComment(data)

    // const updatedComments = comments.map(comment => {
    //   if (comment.id === data.id) {
    //     console.log("HEIIIIIIIIII")
    //     const updateComment = {
    //       ...comment,
    //       content: data.content, 
    //       documentId: data.documentId
    //     }
    //     return updateComment
    //   }
    //   return comment
    // })
    // console.log("LOLOLOL")
    // setComments(updatedComments)
  }

  const setCommentLikeCount = (num) => {
    const updatedComment = {
      ...comment,
      like_Count: comment.like_Count + num
    }
    setComment(updatedComment)
  }

  return (
    <Card>
      <Card.Body>
        <div className="float-left">
          <p>Postet av <b>{users && users.length && users.find(u => u.id === comment.userId).username}</b> {moment(comment.date).calendar()}</p>
        </div>
        <div className="float-right" hidden={!(user.id === comment.userId)}>
          <EditComment comment={comment} edit={editComment}/> &nbsp;
          <Button variant="danger" size="sm" onClick={deleteComment} value={comment.id}>Slett</Button>
        </div>  
        
        <Card.Text><br /><br />
          {comment.content}
          <br/>
          {comment.documentId ? <FileLink fileId={comment.documentId} /> : ""}
        </Card.Text>
        <div className="float-right"> 
          {comment.like_Count} <LikeButton id={comment.id} liked={liked} setLiked={setLiked} isPost={false} updateCommentLike={setCommentLikeCount} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default Comment
