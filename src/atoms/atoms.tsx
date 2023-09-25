import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SnippetType } from 'types/snippets';

//Data
const localSnippets = localStorage.getItem('snippets');
const snippets: SnippetType[] = localSnippets ? JSON.parse(localSnippets) : [];
export const snippetsAtom = atomWithStorage('snippets', snippets, {
  getItem(_, initialValue) {
    try {
      return snippets;
    } catch {
      return initialValue;
    }
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});
export const changeSnippetsAtom = atom(
  null,
  (_get, set, values: SnippetType[]) => {
    set(snippetsAtom, values);
  }
);

//SideBar
export const initialElementAtom = atom<SnippetType | undefined>(undefined);
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
