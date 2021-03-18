import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone';

const dropStyle = {
  textAlign: 'center',
  padding: '10px',
  borderWidth: '3px',
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  margin: '5px'
}

const acceptDropStyle = {
  color: '#00e676'
}


const FileDrop = ({ file, setFile }) => {


  const onDrop = useCallback(acceptedFiles => setFile(acceptedFiles[0]))
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDrop,
    maxFiles: 1
  });

  const fileAccepted = Boolean(file);

  const style = useMemo(() => ({
    ...dropStyle,
    ...fileAccepted ? acceptDropStyle : {}
  }), [fileAccepted])

  return (
    <div>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {file ? <p>{file.name} &#10003;</p> : <p>Drag'n'drop fil, eller klikk for å velge en fil.</p> }
      </div>
    </div>
  )
}

export default FileDrop
