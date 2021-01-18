import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  CssBaseline,
  Button,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Fisher from '../../asset/Fisher.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Fisher})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Layout({auth, error, loginUser}) {
  const [identifier, setIdentifier] = useState();
  const [password, setPassWord] = useState();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if(auth.isAuthenticated) {
      history.push("/home");
    }
  }, [auth.isAuthenticated, history])

  function submitHandler() {
    const userData = {
      identifier: identifier,
      password: password
    }
    loginUser(userData);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              error={error.existing_identifier && error.existing_identifier.length > 0}
              required
              fullWidth
              id="identifier"
              label="Email Address or Username"
              name="identifier"
              autoComplete="identifier"
              autoFocus
              helperText={error.existing_identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              onKeyDown={(event) => {
                if(event.key === 'Enter'){
                  submitHandler();
                }
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              error={error.existing_password && error.existing_password.length > 0}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={error.existing_password}
              onChange={(event) => setPassWord(event.target.value)}
              onKeyDown={(event) => {
                if(event.key === 'Enter'){
                  submitHandler();
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => submitHandler()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

export default Layout;
