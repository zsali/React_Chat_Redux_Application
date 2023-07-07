import React, { useEffect, useState } from "react";
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
import { login } from "../../action";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state?.regiser);
  const [errors, setErrors] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (data.email && data.password) {
      if (registerUser.user !== null) {
        if (
          registerUser.user.email === data.email &&
          registerUser.user.password === data.password
        ) {
          const userInfo = { email: registerUser.user.username };
          dispatch(login(userInfo));
          setTimeout(() => {
            setLoading(false);
            navigate("/", { replace: true });
          }, 500);
        } else {
          setLoading(false);
          setErrors("Your Email or Password is not matching");
          return false;
        }
      } else {
        setLoading(false);
        setErrors("You didn't Register yet");
        return false;
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to Chat Application
        </Header>

        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.email}
              type="email"
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
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors && (
          <Message error>
            <h3>Error</h3>
            <p>{errors}</p>
          </Message>
        )}
        <Message>
          Don't have an account? &nbsp;
          <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
