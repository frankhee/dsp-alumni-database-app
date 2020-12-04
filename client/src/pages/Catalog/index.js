import { connect } from 'react-redux';
import { loadAlumni } from '../../store/actions/alumniActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  alumni: state.alumni.alumni,
  auth: state.user,
  moreAlumni: state.alumni.moreAlumni
});

const mapDispatchToProps = {
  loadAlumni: loadAlumni
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);