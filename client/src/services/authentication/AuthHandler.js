import { useEffect }  from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../../services/api/HttpRequest";
import * as UserActions from "../../store/actions/userActions";

//Check if user is authenticated
function AuthHandler({ actions, auth }) {
  const history = useHistory();
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
        actions.logoutUser(history);
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }, [actions, auth.isAuthenticated, history])

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
