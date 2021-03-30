import React, { useState, useEffect, useContext } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { UserContext } from '../UserContext'

const LikeButton = ({obj}) => {

  const { user } = useContext(UserContext)

  const [liked, setLiked] = useState(false)
  const likeColor = liked ? "blue" : "grey"
  const toggle = () => {
    setLiked(!liked)
  }

  useEffect( async () => {
    const res = await fetch('https://localhost:44361/likes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({UserId: user.id, PostId: obj.id})
    })
    const data = await res.json()
    console.log(data)
  }, [])

  return (
    <span onClick={toggle} >
      <FaThumbsUp color={likeColor} size={18} />
    </span>
  )
}

export default LikeButton
