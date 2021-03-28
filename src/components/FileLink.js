import React, {useState, useEffect} from 'react'

const FileLink = ({fileId}) => {

  const [fileInfo, setFileInfo] = useState({})


  useEffect(async () => {
    const res = await fetch(`https://localhost:44361/GetDocumentInfo/${fileId}`)
    const data = await res.json()
    setFileInfo(data)
  }, [fileId])

  return (
    <a href={`https://localhost:44361/GetDocument/${fileId}`} >{fileInfo.fileName}</a>
  )
}

export default FileLink