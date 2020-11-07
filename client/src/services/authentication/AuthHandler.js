import { useEffect }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../services/authentication/setAuthToken";
import * as UserActions from "../../store/actions/userActions";

function AuthHandler({ actions, auth }) {
  useEffect(() => {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      actions.setCurrentUser(decoded);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        actions.logoutUser();
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }, [actions, auth.isAuthenticated])

  return null;
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHandler);