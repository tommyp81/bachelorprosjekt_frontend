import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { host } from "../../App";
import "../loginComponents/Login.css";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Brukernavn må fylles ut")
    .min(5, "Brukernavn må være minst 5 tegn")
    .max(30, "Brukernavn må være maks 30 tegn"),
  email: yup
    .string()
    .email("E-posten er ikke gyldig")
    .required("E-post må fylles ut"),
  firstName: yup
    .string()
    .required("Fornavn må fylles ut"),
  lastName: yup
    .string()
    .required("Etternavn må fylles ut"),
  password: yup
    .string()
    .required("Passord må fylles ut")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Minst 8 tegn, en stor og en liten bokstav og et tall"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Passord og bekreft passord er ikke like"
    )
    .required("Bekreft passord må fylles ut"),
});

const Register = ({ loginUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetch(host + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        } else {
          return res.json();
        }
      })
      .then(() => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        loginUser(formData);
      })
      .catch((error) => {
        error.text()
        .then((text) => alert(text))
      });
  };

  return (
    <div className="Register">
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <Row className="justify-content-center">
            <Col md="auto" className="register">
              <div>
                <Form.Label htmlFor="regUsername">Brukernavn</Form.Label>
                <Form.Control
                  id="regUsername"
                  role="regiserusername"
                  className="form-control input-lg"
                  name="username"
                  type="text"
                  {...register("username", { required: true })}
                />
                <p className="validationError">{errors["username"]?.message}</p>
              </div>
            </Col>
            <Col md="auto" className="register">
              <div>
                <Form.Label htmlFor="email">E-post</Form.Label>
                <Form.Control
                  id="email"
                  role="registeremail"
                  className="form-control input-lg"
                  name="email"
                  type="text"
                  {...register("email", { required: true })}
                />
                <p className="validationError">{errors["email"]?.message}</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="auto" className="register">
              <div>
                <Form.Label htmlFor="firstname">Fornavn</Form.Label>
                <Form.Control
                  id="firstname"
                  role="registerfirstname"
                  className="form-control input-lg"
                  name="firstName"
                  type="text"
                  {...register("firstName", { required: true })}
                />
                <p className="validationError">
                  {errors["firstName"]?.message}
                </p>
              </div>
            </Col>
            <Col md="auto" className="register">
              <div className="d-flex flex-column">
                <Form.Label htmlFor="lastname">Etternavn</Form.Label>
                <Form.Control
                  id="lastname"
                  role="registerlastname"
                  className="form-control input-lg"
                  name="lastName"
                  type="text"
                  {...register("lastName", { required: true })}
                />
                <p className="validationError">{errors["lastName"]?.message}</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center ">
            <Col md="auto" className="register">
              <div>
                <Form.Label htmlFor="regPassword">Passord</Form.Label>
                <Form.Control
                  id="regPassword"
                  role="registerpassword"
                  className="form-control input-lg"
                  name="password"
                  type="password"
                  {...register("password", { required: true })}
                />
                <p className="validationError">{errors["password"]?.message}</p>
              </div>
            </Col>
            <Col md="auto" className="register ">
              <div>
                <Form.Label htmlFor="confirmpassword">Bekreft passord</Form.Label>
                <Form.Control
                  id="confirmpassword"
                  role="registerconfirmpassword"
                  className="form-control input-lg"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { required: true })}
                />
                <p className="validationError">
                  {errors["confirmPassword"]?.message}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col className="register" sm={6}>
              <Button
                role="submitregisterbutton"
                variant="success"
                size="lg"
                type="submit"
                className="submitbtn"
              >
                Registrer
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
