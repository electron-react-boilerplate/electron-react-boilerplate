import routes from './routes';
import Router from 'react-router';


// we can create a router before 'running' it
export default Router.create({
  routes: routes,
  location: Router.HashLocation
});
