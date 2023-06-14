import { atom } from 'jotai';
import MockData from './../../assets/Data/recetas.json';

//Data
export const data = atom(MockData);
export const keywords = atom((get) => Object.keys(get(data)));
export const contents = atom((get) => Object.entries(get(data)));

//SideBar
export const initialElement = atom<{ keyword: string; text: string }>(
  MockData[0]
);
export const changeElement = atom(
  null,
  (_get, set, value: { keyword: string; text: string }) => {
    set(initialElement, value);
  }
);

//NavBar
export const tabSelected = atom('snippets');
