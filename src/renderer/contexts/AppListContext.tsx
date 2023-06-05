import { createContext } from 'react';

const AppListContext = createContext<any>(null);

export default AppListContext;

/*
interface AppListContextData {
  // Define the shape of your context data
  prop1: string;
  prop2: number;
}

const MyContext = createContext<AppListContextData | undefined>(undefined);
*/
