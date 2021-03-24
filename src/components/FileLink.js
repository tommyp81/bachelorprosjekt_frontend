import React, {useState, useEffect} from 'react'

const FileLink = ({fileId}) => {

  const [fileInfo, setFileInfo] = useState({})


  useEffect(async () => {
    const res = await fetch(`https://webforum.azurewebsites.net/GetDocumentInfo/${fileId}`)
    const data = await res.json()
    setFileInfo(data)
  }, [])

  return (
    <a href={`https://webforum.azurewebsites.net/GetDocument/${fileId}`} >{fileInfo.fileName}</a>
  )
}

export default FileLink