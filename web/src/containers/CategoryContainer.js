import Category from '../presentational/Category';
import { getJavasScriptResults } from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    javascriptResults: getJavasScriptResults(state),
  };
};
export default connect(
  mapStateToProps,
  null,
)(Category);
