import React, {useState, useEffect} from 'react'
import {host} from '../App'

const FileInfo = ({fileId, isReplaced}) => {

  const [fileInfo, setFileInfo] = useState({})


  useEffect(async () => {
    const res = await fetch(host+`GetDocumentInfo/${fileId}`)
    const data = await res.json()
    setFileInfo(data)
  }, [])

  return (
    <p hidden={isReplaced}>Vedlegg: {fileInfo.fileName}</p>
  )
}

export default FileInfo