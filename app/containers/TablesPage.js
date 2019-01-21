// import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as TableActions from '../actions/tables';
// import { routerActions } from 'connected-react-router';

// function mapStateToProps(state) {
//   return {
//     tables: state.tables
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(TableActions, dispatch);
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TableCanvas);

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import TableCanvas from '../components/TableCanvas';
// import ServerConfig from '../components/ServerConfig';
// import routes from '../constants/routes';

// export default class TabPage extends Component {
//   render() {
//     // console.log(routes);
//     return (
//       <div>
//         <Link to="/">Server Config</Link>
//         <p>This is the tables Page</p>
//         <TableCanvas />
//       </div>
//     );
//   }
// }
import TableCanvas from '../components/TableCanvas';

export default TableCanvas;
