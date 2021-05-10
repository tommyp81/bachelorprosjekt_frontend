import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { host } from "../../App";
import { UserContext } from "../../UserContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required("må fylles ut").min(5, 'minst 5 tegn'),
  password: yup.string().required("må fylles ut")
})

const UsernameDialog = ({ users, setUsers }) => {
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
    const res = await fetch(host + `users/${user.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...user, username: data.username, password: data.password })
    })
    if (res.ok) {
      const resData = await res.json()
      setUser({ ...user, username: resData.username })
      // setUsers(users.map(u => {
      //   if(u.id == user.id) {
      //     return {
      //       ...u, 
      //       username: data.username
      //     }
      //   }
      //   return u
      // }))
      alert("Brukernavn endret!")
      reset()
    } else {
      const text = await res.text();
      alert(text);
    }
  }


  // const changeUsername = async () => {
  //   // e.preventDefault();
  //   const res = await fetch(host + `users/${user.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({...users.find(u => u.id == user.id), username: newUsername, password})
  //   })
  //   if(res.ok) { 
  //     const data = await res.json()
  //     setUser({...user, username: data.username})
  //     // setUsers(users.map(u => {
  //     //   if(u.id == user.id) {
  //     //     return {
  //     //       ...u, 
  //     //       username: data.username
  //     //     }
  //     //   }
  //     //   return u
  //     // }))
  //     alert("Brukernavn endret!")
  //   } else {
  //     const text = await res.text();
  //     alert(text);
  //   }
  //   setPassword("");
  // };

  return (
    <>
      <span className="btn-link" onClick={handleShow}>
        Endre brukernavn
      </span>
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
          <br />
          <div>
            <label>Passord</label>
            <input className="form-control input-lg" type="password" name="password" {...register('password')} />
            <p className="validationError">{errors['password']?.message}</p>
          </div>
        
          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nytt Brukernavn"
              value={newUsername}
              onChange={(e) => setNewusername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default UsernameDialog;
