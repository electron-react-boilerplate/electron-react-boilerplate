import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import MaterialUIButton from '@mui/material/Button';
import { API } from '@aws-amplify/api';

import useGlobalState from '../global/GlobalSate';

const StyledCommand = styled.div`
  display: flex;
  justify-content: flex-start;
  width: -webkit-fill-available;
  flex-direction: column;
  align-items: center;
  padding: 24px 24px 12px 24px;
  // TODO: SHOULD BE DYNAMIC WITH PADDING
  height: calc(100vh - 36px);
  position: relative;

  .title_text {
    text-align: start;
    width: 100%;
    margin-bottom: 16px;
  }

  .content {
    height: 100%;
    width: 100%;

    .main__input {
      margin-bottom: 16px;
      color: white;
      width: 100%;

      input {
        color: var(--color-white);
      }
    }
  }

  .button_group {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const Command = ({ setCurrentScreen }) => {
  const [userCopyInput, setUserCopyInput] = useState('');
  const [userTypeInput, setUserTypeInput] = useState('');

  const { availableCommands, selectedCommandIndex, setGlobalLoading } =
    useGlobalState();

  const selectedCommand = availableCommands[selectedCommandIndex];

  // TODO: WORK WITH STEFAN TO USE AUTH SECURELY
  const handleSubmitJob = () => {
    setGlobalLoading(true);

    API.post('main', '/jobs', {
      body: {
        free: selectedCommand.free,
        inputs: selectedCommand.inputs ? [{ specify_type: userTypeInput }] : [],
        prompt_frame: selectedCommand.prompt_frame,
        copied: userCopyInput,
      },
    })
      .then((response) => {
        setCurrentScreen('CLIPBOARD_COPY_SCREEN');
        navigator.clipboard.writeText(response.result);
        setTimeout(() => {
          setGlobalLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setGlobalLoading(false);
        }, 1000);
      });
  };

  return (
    <StyledCommand>
      <h1 className="heading-2 title_text">{selectedCommand.name}</h1>
      <div className="content">
        <TextField
          value={userCopyInput}
          onChange={(e) => setUserCopyInput(e.target.value)}
          className="main__input"
          placeholder="Paste text here"
          variant="standard"
          autoFocus
        />
        {selectedCommand.inputs && (
          <TextField
            value={userTypeInput}
            onChange={(e) => setUserTypeInput(e.target.value)}
            className="main__input"
            placeholder="Specify type (optional)"
            variant="standard"
          />
        )}
      </div>
      <div className="button_group">
        <MaterialUIButton
          variant="outlined"
          color="secondary"
          onClick={() => {
            setCurrentScreen('SEARCH_SCREEN');
          }}
        >
          Go Back
        </MaterialUIButton>
        <MaterialUIButton
          variant="contained"
          color="secondary"
          onClick={() => {
            handleSubmitJob();
          }}
        >
          Generate 🪄
        </MaterialUIButton>
      </div>
    </StyledCommand>
  );
};

export default Command;
