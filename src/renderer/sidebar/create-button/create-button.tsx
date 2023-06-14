import React, { useState } from 'react';
import * as S from './create-button.styled';
import { Button, Modal } from 'rsuite';

const CreateButton: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Button appearance="primary" onClick={handleOpen}>
        Create Snippet
      </Button>
      <S.SnippetModal open={openModal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Create a new snippet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <S.SnippetModalForm onSubmit={() => console.log('caca')}>
            <S.SnippetKeywordInput
              id="new-snippet-keyword"
              trigger={['Enter', 'Space', 'Comma']}
              placeholder="Keywords (add pressing enter, space, or comma)"
              onCreate={(
                value: string[],
                item: [{ label: string; value: string }]
              ) => {
                console.log(value, item);
              }}
            />
            <S.SnippetTextInput
              as="textarea"
              id="snippet-text-id"
              placeholder="Write the snippet's text"
              rows={10}
            />
          </S.SnippetModalForm>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Save
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </S.SnippetModal>
    </>
  );
};

export default CreateButton;
