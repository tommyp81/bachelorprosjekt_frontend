import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { host } from "../../App";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  password: yup.string().required("må fylles ut").min(8, 'minst 8 tegn'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passord stemmer ikke').required("må fylles ut")
})

const PasswordDialog = ({ user }) => {


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

    const res = await fetch(host + `users/${user.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...user, password: data.password }),
    });
    if (res.ok) {
      handleClose();
      alert("Passordet er endret!");
      reset();
    } else {
      const text = await res.text();
      alert(text);
    }

  }


  // const setNewPassword = async (e) => {
  //   e.preventDefault();
  //   if (password === password2) {
  //     const res = await fetch(host + `users/${user.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({ ...user, password }),
  //     });
  //     if (res.ok) {
  //       handleClose();
  //       alert("Passordet er endret!");
  //     } else {
  //       const text = await res.text();
  //       alert(text);
  //     }
  //   } else {
  //     alert("Passordene er ikke like!");
  //   }
  // };

  return (
    <>
      <span className="btn-link" onClick={handleShow}>
        Endre Passord
      </span>
      <Modal animation={false} show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Modal.Header closeButton={true}>
            <Modal.Title>Sett nytt passord for: {user.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
              <label>Passord</label>
              <input className="form-control input-lg" type="password" name="password" {...register('password')} />
              <p className="validationError">{errors['password']?.message}</p>
            </div>
            <br />
            <div>
              <label>Bekreft passord</label>
              <input className="form-control input-lg" type="password" name="confirmPassword" {...register('confirmPassword')} />
              <p className="validationError">{errors['confirmPassword']?.message}</p>
            </div>


            {/* <Form.Group>
            <Form.Control
              type="password"
              placeholder="Nytt Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Bekreft Passord"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group> */}
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
    </>
  );
};

export default PasswordDialog;
