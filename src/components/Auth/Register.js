import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { registerUser } from "../../action";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(data)) {
      //throw error if the form field is empty
      error = { message: "Fill in all Fields" };
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid(data)) {
      //throw error if the password is invlaid

      error = { message: "Password is invalid| Max 6 Digit" };
      setErrors(errors.concat(error));
      return false;
    } else {
      //form Valid
      return true;
    }
  };

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      // console.log("Password length")
      return false;
    } else if (password !== passwordConfirmation) {
      // console.log("password unmatch")
      return false;
    } else {
      // console.log("ok pass");
      return true;
    }
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    setLoading(true);
    if (isFormValid()) {
      dispatch(registerUser(data));
      setTimeout(() => {
        setLoading(false);
        navigate("/login", { replace: true });
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register Form For Chat Application
        </Header>

        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.email}
              type="email"
              className={handleInputError(errors, "email")}
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              autoComplete="on"
              type="password"
              className={handleInputError(errors, "password")}
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={data.passwordConfirmation}
              autoComplete="on"
              type="password"
              className={handleInputError(errors, "password")}
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="orange"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Already A User? &nbsp;
          <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
