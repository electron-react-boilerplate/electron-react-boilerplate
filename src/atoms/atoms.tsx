import { atom } from 'jotai';
import MockData from './../../assets/Data/recetas.json';

export const data = atom(MockData);
export const keywords = atom((get) => Object.keys(get(data)));
export const contents = atom((get) => Object.entries(get(data)));
export const activeElement = atom<{ keyword: string; text: string }>({
  keyword: '',
  text: '',
});
