import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { host, UserContext } from "../../App";
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "./AdminPanel.css"

const schema = yup.object().shape({
  password: yup.string()
  .required("Passord må fylles ut")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Minst 8 tegn, en stor og en liten bokstav og et tall"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passord og bekreft passord er ikke like').required("Bekreft passord må fylles ut")
})

const AdminPasswordDialog = ({ selectedUser }) => {

    const { user } = useContext(UserContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true);
    };
  
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema)
    })
  
    const onSubmit = async data => {
  
      const res = await fetch(host + `users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
        Authorization: `Bearer ${user.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...selectedUser, password: data.password }),
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

  return (
    <div className="AdminPasswordDialog">
      <Link onClick={handleShow}>
        Endre passord
      </Link>
      <Modal animation={false} show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Modal.Header closeButton={true}>
            <Modal.Title>Sett nytt passord for {selectedUser.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="password">Passord</label>
              <input className="form-control input-lg" id="password" type="password" name="password" {...register('password')} />
              <p className="validationError">{errors['password']?.message}</p>
            </div>
            <br />
            <div>
              <label htmlFor="confirmpassword">Bekreft passord</label>
              <input className="form-control input-lg" id="confirmpassword" type="password" name="confirmPassword" {...register('confirmPassword')} />
              <p className="validationError">{errors['confirmPassword']?.message}</p>
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
    </div>
  );
};

export default AdminPasswordDialog;
