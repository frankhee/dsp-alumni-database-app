import UserServices from '../../services/api/UserServices';
import { setAuthToken } from "../../services/api/HttpRequest";
import jwt_decode from "jwt-decode";

export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// Register User
export const registerUser = (userData, history) => {
  return function(dispatch) {
    return UserServices.registerUser(userData)
      .then((result) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_ERRORS,
          payload: err.data
        })
      }) 
  }
};

// Login - get user token
export const loginUser = (userData) => {
  return function(dispatch) {
    dispatch(setUserLoading());
    return UserServices.loginUser(userData)
      .then((result) => {
      // Set token to localStorage
      const token = result.token;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));      
      dispatch({
        type: CLEAR_ERRORS,
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
    }) 
  }
};

//Log user out
export const logoutUser = (history) => {
  return function(dispatch) {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    history.push("/login");
    dispatch(setCurrentUser({}));
  }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
