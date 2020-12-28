import { connect } from 'react-redux';
import { loadAlumni } from '../../store/actions/alumniActions';
import Layout from './Layout';

const mapStateToProps = (state) => ({
  alumni: state.alumni.alumni,
  auth: state.user,
  moreAlumni: state.alumni.moreAlumni,
  isSearch: state.alumni.isSearch,
  isValidSearch: state.alumni.isValidSearch
});

const mapDispatchToProps = {
  loadAlumni: loadAlumni
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);