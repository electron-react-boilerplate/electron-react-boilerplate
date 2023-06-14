import { atom } from 'jotai';
import MockData from './../../assets/Data/recetas.json';

//Data
export const data = atom(MockData);
export const keywords = atom((get) => Object.keys(get(data)));
export const contents = atom((get) => Object.entries(get(data)));

//SideBar
export const activeElement = atom<{ keyword: string; text: string }>({
  keyword: '',
  text: '',
});

//NavBar
export const tabSelected = atom('snippets');
