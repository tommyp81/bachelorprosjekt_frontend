import React, { useState, useEffect, useContext } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { UserContext } from '../App'

import { host } from '../App'

const LikeButton = ({id, liked, setLiked, isPost, updatePostLike, updateCommentLike}) => {

  const { user } = useContext(UserContext)

  const likeInfo = () => {
    if (isPost) {
      return {
        PostId: id,
        UserId: user.id
      }
    } else {
      return {
        CommentId: id,
        UserId: user.id
      }
    }
  }
  
  const likeColor = liked ? "DodgerBlue" : "grey"
  const toggle = () => {
    liked ? deleteLike() : addLike()
  }

  useEffect( async () => {
    const res = await fetch(host+'GetLike', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(likeInfo())
    })
    try {
      if(res.status === 200)
        setLiked(true)
      
    } catch (error) {
      console.log(error)
      // setLiked(false)
    }
  }, [])

  const addLike = async () => {
    const res = await fetch(host+'AddLike', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(likeInfo())
    })
    if (res.status === 200) {
      if(isPost)
        updatePostLike(1)
      else
        updateCommentLike(1)
      setLiked(true)
    }
      
  }

  const deleteLike = async () => {
    const res = await fetch(host+'DeleteLike', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(likeInfo())
    })
    if (res.status === 200) {
      if(isPost)
        updatePostLike(-1)
      else
        updateCommentLike(-1)
      setLiked(false)
    }
      
  }

  

  return (
    <span onClick={toggle} >
      <FaThumbsUp className="like ml-1 mr-1 mb-2" color={likeColor} size={18} />
    </span>
  )
}

export default LikeButton
