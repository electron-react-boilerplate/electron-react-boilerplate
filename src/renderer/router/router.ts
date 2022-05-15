import Home from '../views/Home/index.jsx';
import DbList from '../views/DBList/index.jsx';


export interface Router {
  path: string;
  component: any;
}


const routers : Router[] = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/',
    component: DbList,
  },
];

export default routers;
