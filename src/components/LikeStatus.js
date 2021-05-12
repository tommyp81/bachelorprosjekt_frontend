import React, { useContext, useEffect, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { host } from '../App'
import { UserContext } from '../UserContext'

const LikeStatus = ({postId}) => {

  const { user } = useContext(UserContext)

  const [liked, setLiked] = useState(false)

  const likeColor = liked ? "DodgerBlue" : "grey"

  useEffect( async () => {
    const res = await fetch(host+'GetLike', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        postId,
        userId: user.id
      })
    })
    try {
      if(res.status === 200)
        setLiked(true)
      
    } catch (error) {
      console.log(error)
      // setLiked(false)
    }
  }, [])

  return (
    <span>
      <FaThumbsUp className="ml-1 mr-1 mb-2" color={likeColor} size={18} />
    </span>
  )
}

export default LikeStatus
