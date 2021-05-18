import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {host} from '../App'
import { UserContext } from '../App'

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

  const downloadFile = async () => {
    const res = await fetch(host + `GetDocument/${fileId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`
      },
    })
    const data = await res.blob()
    let url = URL.createObjectURL(data)
    let a = document.createElement('a')
    a.href = url;
    a.download = fileInfo.fileName
    a.click()
  }


  return (
    <Button variant="link" style={{padding: "unset"}} onClick={downloadFile}>{fileInfo.fileName}</Button>
  )
}

export default FileLink