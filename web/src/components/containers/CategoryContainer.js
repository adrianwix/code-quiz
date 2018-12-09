import Category from '../presentational/Category';
import { connect } from 'react-redux';
import { getJavasScriptResults } from 'reducers/selectors';

const mapStateToProps = state => {
  return {
    javascriptResults: getJavasScriptResults(state),
  };
};

export default connect(mapStateToProps)(Category);
