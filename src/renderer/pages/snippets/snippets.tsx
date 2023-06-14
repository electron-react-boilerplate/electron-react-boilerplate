import React from 'react';
import * as S from './snippets.styled';
import InputTextArea from 'components/textarea/textarea';
import { Button, Notification, useToaster } from 'rsuite';
import { data, initialElement } from 'atoms/atoms';
import { useAtom } from 'jotai';
import { MessageType } from 'rsuite/esm/Notification/Notification';

const message = (text: string, type?: MessageType) => (
  <Notification type={type} header={text} closable />
);

const SnippetsPage: React.FC = () => {
  const [selected, setSelected] = useAtom(initialElement);
  const [contentValue, setContentValue] = useAtom(data);
  const toaster = useToaster();
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

  return (
    <S.SnippetsPage>
      <S.Actions>
        <Button appearance="ghost" onClick={handleCopyClick}>
          Copy
        </Button>
      </S.Actions>
      <InputTextArea
        value={
          contentValue.find((element) => element.keyword === selected.keyword)
            ?.text
        }
        onChange={(newContent: string) => {
          const newData = contentValue.map((element) => {
            if (element.keyword === selected.keyword)
              return { ...element, text: newContent };
            return element;
          });
          setContentValue(newData);
          setSelected(selected);
        }}
      />
    </S.SnippetsPage>
  );
};

export default SnippetsPage;
