import React, { useContext, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { host } from "../../App";
import { UserContext } from "../../App";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "./AdminPanel.css"

const schema = yup.object().shape({
  username: yup.string().required("Brukernavn må fylles ut!").min(5, 'Brukernavn må være minst 5 tegn')
})

const UsernameDialog = () => {
  const { user, setUser } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log(data)
    const formData = new FormData()
    formData.append('id', user.id)
    formData.append('username', data.username)
    const res = await fetch(host + `SetUsername`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      body: formData
    })
    if (res.ok) {
      const resData = await res.json()
      setUser({ ...user, username: resData.username })
      alert("Brukernavn endret!")
      reset()
    } else {
      const text = await res.text();
      alert(text);
    }
  }

  return (
    <div className="UsernameDialog">
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>Endre brukernavn for {user.username}</h3>
        <br/>
        <Form.Label>
          Nytt brukernavn
        </Form.Label>
        <Form.Control type="text" name="username" {...register('username')} />
        <p className="validationError">{errors['username']?.message}</p>
        <Button
          variant="success"
          type="submit"
        >
          Bekreft
        </Button>
      </Form>
    </Container>
    </div>/*
    <>
      <Link onClick={handleShow}>
        Endre brukernavn
      </Link>
      <Modal animation={false} show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Sett nytt brukernavn for {user.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Nytt brukernavn</label>
              <input className="form-control input-lg" type="text" name="username" {...register('username')} />
              <p className="validationError">{errors['username']?.message}</p>
            </div>
          </Modal.Body>
          <div className="float-right w-100">
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Avbryt
            </Button>
              <Button
                variant="success"
                type="submit"
              >
                Endre
            </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    </>*/
  );
};

export default UsernameDialog;
