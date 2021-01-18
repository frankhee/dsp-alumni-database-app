import { connect } from 'react-redux';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  auth: state.user,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);