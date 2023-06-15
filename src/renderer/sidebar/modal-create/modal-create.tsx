import React, { SyntheticEvent } from 'react';
import * as S from './modal-create.styled';
import { Button, Modal } from 'rsuite';
import { atom, useAtom } from 'jotai';
import { openModalAtom } from 'atoms/atoms';
import { SnippetType } from 'types/snippets';

const keywordsAtom = atom(['']);
const formErrorAtom = atom(false);

const ModalCreateSnippet: React.FC<{ cloneSnippet: SnippetType }> = ({
  cloneSnippet,
}) => {
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const [keywords, setKeywords] = useAtom(keywordsAtom);
  const [formError, setFormError] = useAtom(formErrorAtom);

  const handleClose = () => setOpenModal(false);
  const handleSubmit = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      text: HTMLInputElement;
    };
    if (!target.text?.value.trim() || !keywords.length) setFormError(true);
    else {
      formError && setFormError(false);
    }
    console.log(keywords);
  };
  return (
    <S.SnippetModal
      overflow={false}
      size="md"
      open={openModal}
      onClose={handleClose}
      error={formError}
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
            name="keywords"
            trigger={['Enter', 'Space', 'Comma']}
            placeholder="Keywords (add pressing enter, space, or comma)"
            value={cloneSnippet.keyword ? [cloneSnippet.keyword] : undefined}
            onCreate={(
              value: string[],
              _item: [{ label: string; value: string }]
            ) => {
              setKeywords(value);
            }}
          />
          <S.SnippetTextInput
            as="textarea"
            name="text"
            placeholder="Write the snippet's text"
            defaultValue={cloneSnippet?.text}
            rows={10}
          />
          {formError && (
            <S.FormErrorText>Fields can't be empty</S.FormErrorText>
          )}
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
