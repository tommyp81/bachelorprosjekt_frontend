import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Kunnskapsportalen.css";
import FileDrop from "../FileDrop";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { host } from "../../App";
import { UserContext } from "../../App";

const schema = yup.object().shape({
  infoTopicId: yup.string().required("Velg en kategori"),
});

const AddDocument = ({ infoTopics, setDocuments }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(UserContext);

  const [file, setFile] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("File", file);
    formData.append("userId", user.id);
    formData.append("infoTopicId", data.infoTopicId);
    fetch(host + "UploadDocument", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDocuments((current) => [...current, data]);
      })
      .catch((error) => console.log(error));
    handleClose();
    reset();
  };

  return (
    <div className="AddDocument">
      <Button onClick={handleShow} variant="primary" role="uploadfile">
        Last opp fil
      </Button>

      <Modal show={show} onHide={handleClose} role="uploadfile" centered>
        <Modal.Header closeButton>
          <Modal.Title>Last opp fil</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div role="choosefile">
              <label>Velg fil</label>
              <FileDrop file={file} setFile={setFile} />
            </div>
            <div className="form-group">
              <label for="kategoriVelger">Velg kategori</label>
              <select
                className="form-control"
                id="kategoriVelger"
                name="infoTopicId"
                {...register("infoTopicId")}
                role="choosecategory"
              >
                {infoTopics.map((mappedInfoTopics) => (
                  <option key={mappedInfoTopics.id} value={mappedInfoTopics.id}>
                    {mappedInfoTopics.title}
                  </option>
                ))}
              </select>
              <p className="validationError">
                {errors["infoTopicId"]?.message}
              </p>
            </div>
            <div className="float-right">
              <Button variant="danger" onClick={handleClose} role="cancel">
                Avbryt
              </Button>
              &nbsp;
              <Button type="submit" variant="primary" disabled={!file} role="confirm">
                Send
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  );
};

export default AddDocument;
