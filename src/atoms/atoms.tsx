import MockData from './../../assets/Data/recetas.json';
import { atom } from 'jotai';
import { SnippetType } from 'types/snippets';

//Data
export const dataAtom = atom(MockData);
export const keywordsAtom = atom((get) => Object.keys(get(dataAtom)));
export const contentsAtom = atom((get) => Object.entries(get(dataAtom)));
export const changeDataAtom = atom(null, (_get, set, values: SnippetType[]) => {
  set(dataAtom, values);
});

//SideBar
export const initialElementAtom = atom<SnippetType>(MockData[0]);
export const changeElementAtom = atom(null, (_get, set, value: SnippetType) => {
  set(initialElementAtom, value);
});

//NavBar
export const tabSelectedAtom = atom('snippets');

//SnippetsPage
export const openModalAtom = atom(false);
export const openConfirmationModalAtom = atom(false);
export const cloneSnippetAtom = atom<SnippetType>({ keyword: '', text: '' });
export const deleteSnippetAtom = atom<SnippetType>({ keyword: '', text: '' });
