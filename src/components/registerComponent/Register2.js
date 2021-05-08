import React from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { host } from '../../App';
import './Register.css'

const schema = yup.object().shape({
  username: yup.string().required("må fylles ut").min(5, 'minst 5 tegn'),
  email: yup.string().email().required("må fylles ut"),
  firstName: yup.string().required("må fylles ut").min(),
  lastName: yup.string().required("må fylles ut"),
  password: yup.string().required("må fylles ut").min(8, 'minst 8 tegn'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'password must match').required("må fylles ut")
})

const Register2 = ({loginUser}) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })


  const onSubmit = data => {
    console.log(data)
    fetch(host + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if(!res.ok) {
          res.text().then(text => alert(text))
        } else {
          return res.json();
        }    
      })
      .then(() => {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('password', data.password)
        loginUser(formData)
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container className="text-center">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-center"> 
          <Col md="auto" className="register">
            <div >
              <label>Brukernavn</label>
              <input className="form-control input-lg" name="username" type="text" {...register('username', { required: true })} />
              <p className="validationError">{errors['username']?.message}</p>
            </div>
            
            
          </Col >
          <Col md="auto" className="register">
            <div >
              <label>E-post</label>
              <input className="form-control input-lg" name="email" type="email" {...register('email', { required: true })} />
              <p className="validationError">{errors['email']?.message}</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Col md="auto" className="register">
            <div>
              <label >Fornavn</label>
              <input className="form-control input-lg" name="firstName" type="text" {...register('firstName', { required: true })} />
              <p className="validationError">{errors['firstName']?.message}</p>
            </div>
          </Col>
          <Col md="auto" className="register">
            <div className="d-flex flex-column">
              <label>Etternavn</label>
              <input className="form-control input-lg" name="lastName" type="text" {...register('lastName', { required: true })} />
              <p className="validationError">{errors['lastName']?.message}</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Col md="auto" className="register">
            <div >
              <label>Passord</label>
              <input className="form-control input-lg" name="password" type="password" {...register('password', { required: true })} />
              <p className="validationError">{errors['password']?.message}</p>
            </div>
          </Col>
          <Col md="auto" className="register ">
            <div >
              <label>Bekreft passord</label>
              <input className="form-control input-lg" name="confirmPassword" type="password" {...register('confirmPassword', { required: true })} />
              <p className="validationError">{errors['confirmPassword']?.message}</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col className="register" sm={6}>
            <Button
              variant="success"
              type="submit"
              className="w-100"
            >
              Registrer
            </Button>
          </Col>
        </Row>
      </form>
      
    </Container>
  )
}

export default Register2
