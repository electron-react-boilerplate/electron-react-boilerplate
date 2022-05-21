import Home from '../views/Home/index.jsx';
import DbList from '../views/DBList/index.jsx';


export interface RouterItem {
  path: string;
  component: any;
}


const routers : RouterItem[] = [
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
