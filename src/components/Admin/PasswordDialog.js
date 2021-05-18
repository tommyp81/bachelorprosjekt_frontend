import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { host } from "../../App";
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

const PasswordDialog = ({ user }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log(data)

    const res = await fetch(host + `users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...user, password: data.password }),
    });
    if (res.ok) {
      alert("Passordet er endret!");
      reset();
    } else {
      const text = await res.text();
      alert(text);
    }
  }

  return (
    <div className="PasswordDialog">
    <Container>
        <h3>Endre passord for {user.username}</h3>
        <br/>
        <Form onSubmit={handleSubmit(onSubmit)} >
          <Form.Label htmlFor="password">
            Nytt passord
          </Form.Label>
          <Form.Control type="password" id="password" name="password" {...register('password')} />
          <p className="validationError">{errors['password']?.message}</p>
          <Form.Label htmlFor="confirmpassword">
            Bekreft passord
          </Form.Label>
          <Form.Control type="password" id="confirmpassword" name="confirmPassword" {...register('confirmPassword')} />
          <p className="validationError">{errors['confirmPassword']?.message}</p>
          <Button
            variant="success"
            type="submit"
          >
            Bekreft
          </Button>
      </Form>
    </Container>
    </div>
  );
};

export default PasswordDialog;
