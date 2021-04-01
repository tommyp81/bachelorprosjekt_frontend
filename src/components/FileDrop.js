import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const dropStyle = {
  textAlign: "center",
  padding: "10px",
  borderWidth: "3px",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  marginBottom: "20px",
  borderRadius: "3px",
};

const acceptDropStyle = {
  color: "#00e676",
};

const rejectDropStyle = {
  color: "#ff1744",
};

const FileDrop = ({ file, setFile }) => {
  const onDrop = useCallback((acceptedFiles) => setFile(acceptedFiles[0]));
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 15728640,
    accept: ".txt, .pdf, .doc, .docx, .xls, .xlsx",
  });

  const fileAccepted = Boolean(file);
  const fileRejected = fileRejections.length > 0;

  const style = useMemo(
    () => ({
      ...dropStyle,
      ...(fileAccepted ? acceptDropStyle : {}),
      ...(fileRejected ? rejectDropStyle : {}),
    }),
    [fileAccepted, fileRejected]
  );

  const dropzoneMessage = () => {
    if (fileAccepted) {
      return <p>{file.name} &#10004;&#65039;</p>;
    } else if (fileRejected) {
      return <p>Filen er for stor eller filtypen er ugyldig &#10060;</p>;
    } else {
      return (
        <p>Drag'n'drop, eller klikk for å velge en fil (Max 15 megabytes)</p>
      );
    }
  };

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {/* {file ? <p>{file.name} &#10003;</p> : <p>Drag'n'drop fil, eller klikk for å velge en fil.</p> } */}
        {dropzoneMessage()}
      </div>
    </div>
  );
};

export default FileDrop;
