import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {{properCase name}} from '../components/{{properCase name}}';
import * as {{properCase name}}Actions from '../actions/{{camelCase name}}';

function mapStateToProps(state) {
  return {
    value: state.{{camelCase name}}
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({{properCase name}}Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)({{properCase name}});
