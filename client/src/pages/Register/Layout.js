import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  CssBaseline,
  Button,
  TextField,
  Link,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Layout({registerUser, error}) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const classes = useStyles();
  const history = useHistory();

  function submitHandler() {
    const user = {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    registerUser(user, history);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                error={error.new_firstname && error.new_firstname.length > 0}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                helperText={error.new_firstname}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                error={error.new_lastname && error.new_lastname.length > 0}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastname"
                helperText={error.new_lastname}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={error.new_email && error.new_email.length > 0}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={error.new_email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={error.new_username && error.new_username.length > 0}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                helperText={error.new_username}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={error.new_password && error.new_password.length > 0}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={error.new_password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={error.new_confirmPassword && error.new_confirmPassword.length > 0}
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                helperText={error.new_confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => submitHandler()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

export default Layout;

