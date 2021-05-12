import React, { useContext, useState } from "react";
import {
  Button,
  Modal
} from "react-bootstrap";
import "./Kunnskapsportalen.css";
import { host } from "../../App";
import { UserContext } from "../../UserContext";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

// ^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$
const regExp = /(.+?)(\/)(watch\x3Fv=)?(embed\/watch\x3Ffeature\=player_embedded\x26v=)?([a-zA-Z0-9_-]{11})/;
const schema = yup.object().shape({
  youtubeId: yup.string().required("Må fylles ut").matches(
    regExp,
    {
      message: 'Ikke en gyldig YouTube URL',
      excludeEmptyString: true
    }
  ),
  title: yup.string().required("Må fylles ut"),
  description: yup.string().required("Må fylles ut"),
  infoTopicId: yup.string().required("Velg en kategori")
})

const AddVideo = ({
  infoTopics,
  setVideos,
  addPost,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log(data)
    const match = regExp.exec(data.youtubeId);
    const matchString = match[match.length - 1].toString();
    console.log(matchString)

    const postData = {
      title: data.title,
      content: data.description,
      userId: user.id,
      subTopicId: Number(data.infoTopicId) + 16, // TODO
      topicId: 5,
    };


    console.log(postData);

    const postId = await addPost(postData);


    const videoData = {
      youtubeId: matchString,
      title: data.title,
      description: data.description,
      userId: user.id,
      postId,
      infoTopicId: data.infoTopicId,
    };

    console.log("Objektet:");
    console.log(videoData);

    fetch(host + "Videos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(videoData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setVideos((current) => [...current, data]);
      })
      .catch((error) => console.log(error));

    handleClose();
    reset();


  }

  return (
    <div className="UploadFile">
      <Button onClick={handleShow} variant="primary">
        Last opp
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Legg inn Youtube video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>YouTube URL</label>
              <input className="form-control input-lg" name="youtubeId" type="text" {...register("youtubeId", { required: true })} />
              <p className="validationError">{errors['youtubeId']?.message}</p>
            </div>
            <br />
            <div>
              <label>Tittel</label>
              <input className="form-control input-lg" name="title" type="text" {...register("title", { required: true })} />
              <p className="validationError">{errors['title']?.message}</p>
            </div>
            <br />
            <div>
              <label>Beskrivelse</label>
              <input className="form-control input-lg" name="description" type="text" {...register("description", { required: true })} />
              <p className="validationError">{errors['description']?.message}</p>
            </div>
            <br />

            <div className="form-group">
              <label for="kategoriVelger">Velg kategori</label>
              <select className="form-control" id="kategoriVelger" name="infoTopicId" {...register("infoTopicId")} >
                <option value=''></option>
                {infoTopics.map((mappedInfoTopics) => (
                  <option key={mappedInfoTopics.id} value={mappedInfoTopics.id}>
                    {mappedInfoTopics.title}
                  </option>
                ))}
              </select>
              <p className="validationError">{errors['infoTopicId']?.message}</p>
            </div>
            <div className="float-right">
              <Button variant="danger" onClick={handleClose} >
                Avbryt
              </Button>
              &nbsp;
              <Button
                type="submit"
                variant="primary"
              >
                Send
              </Button>
            </div>

          </form>

        </Modal.Body>
        <Modal.Body></Modal.Body>
      </Modal >
    </div >
  );
};

export default AddVideo;
