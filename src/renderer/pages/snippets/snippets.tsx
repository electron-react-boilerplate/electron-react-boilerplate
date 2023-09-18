import React from 'react';
import * as S from './snippets.styled';
import InputTextArea from 'components/textarea/textarea';
import { Button, Modal, Notification, useToaster } from 'rsuite';
import {
  cloneSnippetAtom,
  snippetsAtom,
  initialElementAtom,
  deleteSnippetAtom,
  openModalAtom,
  openConfirmationModalAtom,
  changeSnippetsAtom,
} from 'atoms/atoms';
import { useAtom } from 'jotai';
import { MessageType } from 'rsuite/esm/Notification/Notification';
import { useTheme } from 'styled-components';
import { SnippetType } from 'types/snippets';

const message = (text: string, type?: MessageType) => (
  <Notification type={type} header={text} closable />
);

window.electron.ipcRenderer.on('show-copied-notification', (args) => {
  window.document.getElementById('copy-button')?.click();
});

const SnippetsPage: React.FC = () => {
  const [selected, setSelected] = useAtom(initialElementAtom);
  const [snippets] = useAtom(snippetsAtom);
  const [contentValue, setContentValue] = useAtom(snippetsAtom);
  const textareaValue = contentValue.find(
    (element: SnippetType) => element?.keyword === selected?.keyword
  )?.text;
  const [deleteSnippet, setDeleteSnippet] = useAtom(deleteSnippetAtom);
  const [, setOpenModal] = useAtom(openModalAtom);
  const [, setCloneSnippet] = useAtom(cloneSnippetAtom);
  const [, setChangeData] = useAtom(changeSnippetsAtom);
  const [openConfirmationModal, setOpenConfirmationModal] = useAtom(
    openConfirmationModalAtom
  );
  const toaster = useToaster();
  const theme = useTheme();
  const handleCopyClick = async () => {
    try {
      const textarea = document.getElementById(
        'textarea-id'
      ) as HTMLInputElement;
      await navigator.clipboard.writeText(textarea.value ?? '');
      toaster.push(message('Texto copiado al portapapeles', 'success'), {
        placement: 'bottomEnd',
        duration: 2000,
      });
    } catch (error) {
      toaster.push(
        message(`Error al copiar el texto al portapapeles: ${error}`, 'error'),
        {
          placement: 'bottomEnd',
          duration: 3,
        }
      );
    }
  };
  const handleDelete = (snippet: SnippetType) => {
    setDeleteSnippet(snippet);
    setOpenConfirmationModal(true);
  };
  const handleClone = (snippet: SnippetType) => {
    setCloneSnippet(snippet);
    setOpenModal(true);
  };
  const handleDeleteSnippet = () => {
    const newData: SnippetType[] = snippets.filter(
      (snippet: SnippetType) => snippet.keyword !== deleteSnippet.keyword
    );
    setChangeData(newData);
    setSelected(newData[0]);
    setOpenConfirmationModal(false);
  };

  return (
    <>
      <S.SnippetsPage>
        {selected && (
          <S.Actions>
            <Button
              id="copy-button"
              appearance="ghost"
              onClick={handleCopyClick}
            >
              Copy
            </Button>
            <Button appearance="ghost" onClick={() => handleClone(selected)}>
              Clone
            </Button>
            <Button
              appearance="primary"
              style={{ backgroundColor: theme.red }}
              onClick={() => handleDelete(selected)}
            >
              Delete
            </Button>
          </S.Actions>
        )}
        <InputTextArea
          value={textareaValue || ''}
          onChange={(newContent: string) => {
            const newData = contentValue.map((element: SnippetType) => {
              if (element?.keyword === selected.keyword)
                return { ...element, text: newContent };
              return element;
            });
            setContentValue(newData);
            setSelected(selected);
          }}
        />
      </S.SnippetsPage>
      <Modal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
      >
        <Modal.Header>
          <Modal.Title>
            Delete <b>"{deleteSnippet.keyword}"</b> snippet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action can not be undone and the snippet will be remove
          permanently!
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setOpenConfirmationModal(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
          <Button
            appearance="primary"
            style={{ backgroundColor: theme.red }}
            onClick={handleDeleteSnippet}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SnippetsPage;
