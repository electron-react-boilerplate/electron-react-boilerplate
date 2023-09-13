import React, { SyntheticEvent } from 'react';
import * as S from './modal-create.styled';
import { Button, Modal } from 'rsuite';
import { atom, useAtom } from 'jotai';
import { changeElementAtom, openModalAtom, snippetsAtom } from 'atoms/atoms';
import { SnippetType } from 'types/snippets';

const formErrorAtom = atom('');

const ModalCreateSnippet: React.FC<{ cloneSnippet: SnippetType }> = ({
  cloneSnippet,
}) => {
  const [snippets, setSnippets] = useAtom(snippetsAtom);
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const [formError, setFormError] = useAtom(formErrorAtom);
  const [, setSelectedSnippet] = useAtom(changeElementAtom);

  const handleClose = () => setOpenModal(false);
  const handleSubmit = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      keyword: HTMLInputElement;
      text: HTMLInputElement;
    };

    if (!target.text?.value.trim() || !target.keyword?.value.trim())
      setFormError('Fields can not be empty');
    else if (
      snippets.find(
        (element: SnippetType) => element.keyword === target.keyword?.value
      )
    ) {
      setFormError('This keyword already exists');
    } else {
      formError && setFormError('');

      const newSnip = {
        keyword: target.keyword?.value,
        text: target.text?.value,
      };
      if (snippets) {
        setSnippets([...snippets, newSnip]);
      } else {
        setSnippets([newSnip]);
      }

      handleClose();
      setSelectedSnippet(newSnip);
    }
  };
  return (
    <S.SnippetModal
      overflow={false}
      size="md"
      open={openModal}
      onClose={handleClose}
      $error={!!formError}
    >
      <Modal.Header>
        <Modal.Title>
          {cloneSnippet.keyword
            ? `Cloning "${cloneSnippet.keyword}"`
            : 'Create a new'}{' '}
          snippet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <S.SnippetModalForm
          id="new-snippet-form"
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <S.SnippetKeywordInput
            name="keyword"
            placeholder="Keywords (add pressing enter, space, or comma)"
            defaultValue={
              cloneSnippet.keyword
                ? `${cloneSnippet.keyword} - Copy`
                : undefined
            }
          />
          <S.SnippetTextInput
            as="textarea"
            name="text"
            placeholder="Write the snippet's text"
            defaultValue={cloneSnippet.text}
            rows={10}
          />
          {!!formError && <S.FormErrorText>{formError}</S.FormErrorText>}
        </S.SnippetModalForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
        <Button type="submit" form="new-snippet-form" appearance="primary">
          Save
        </Button>
      </Modal.Footer>
    </S.SnippetModal>
  );
};

export default ModalCreateSnippet;
