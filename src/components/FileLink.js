import React, {useState, useEffect, useContext} from 'react'
import {host} from '../App'
import { UserContext } from '../UserContext'

const FileLink = ({fileId}) => {

  const [fileInfo, setFileInfo] = useState({})
  const { user } = useContext(UserContext)


  useEffect(async () => {
    const res = await fetch(host+`GetDocumentInfo/${fileId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const data = await res.json()
    setFileInfo(data)
  }, [fileId])


  return (
    <a href={host+`GetDocument/${fileId}`} >{fileInfo.fileName}</a>
  )
}

export default FileLink