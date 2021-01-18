import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { registerUser } from '../../store/actions/userActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  error: state.error
});

const mapDispatchToProps = {
  registerUser: registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));