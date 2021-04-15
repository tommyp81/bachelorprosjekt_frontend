import React, {useState, useEffect} from 'react'
import {host} from '../App'

const FileLink = ({fileId}) => {

  const [fileInfo, setFileInfo] = useState({})


  useEffect(async () => {
    const res = await fetch(host+`GetDocumentInfo/${fileId}`)
    const data = await res.json()
    setFileInfo(data)
  }, [fileId])

  return (
    <a href={host+`GetDocument/${fileId}`} >{fileInfo.fileName}</a>
  )
}

export default FileLink