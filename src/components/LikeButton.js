import React, { useState, useEffect, useContext } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { UserContext } from '../UserContext'

const LikeButton = ({id, liked, setLiked, isPost}) => {

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
  
  const likeColor = liked ? "blue" : "grey"
  const toggle = () => {
    liked ? deleteLike() : addLike()
  }

  const addLike = async () => {
    const res = await fetch('https://localhost:44361/AddLike', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(likeInfo())
    })
    if (res.status === 200)
      setLiked(true)
  }

  const deleteLike = async () => {
    const res = await fetch('https://localhost:44361/DeleteLike', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(likeInfo())
    })
    if (res.status === 200)
      setLiked(false)
  }

  useEffect( async () => {
    const res = await fetch('https://localhost:44361/GetLike', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(likeInfo())
    })
    try {
      if(res.status === 200)
        setLiked(true)
      
    } catch (error) {
      console.log(error)
      setLiked(false)
    }
    
    
  }, [])

  return (
    <span onClick={toggle} >
      <FaThumbsUp color={likeColor} size={18} />
    </span>
  )
}

export default LikeButton
