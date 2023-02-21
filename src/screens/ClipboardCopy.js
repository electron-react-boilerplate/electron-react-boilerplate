import React, { useEffect } from "react";
import styled from "styled-components";
import MaterialUIButton from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const StyledClipboardCopy = styled.div`
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
    margin-bottom: 24px;
    color: var(--color-light-grey);
  }

  .copy_icon {
    margin-bottom: 24px;
    font-size: 72px;
  }

  .how_to_copy_text {
    color: var(--color-white);
    margin-bottom: 24px;
  }

  .disclaimer_text {
    color: var(--color-dark-grey);
  }

  .content {
    height: 100%;
    width: 100%;
    .main__input {
      color: white;
      width: 100%;

      input {
        color: var(--color-white);
      }
    }
  }
`;

const ClipboardCopy = ({ setCurrentScreen }) => {
  useEffect(() => {
    setTimeout(() => {
      setCurrentScreen("SEARCH_SCREEN");
    }, 5000);
  });

  return (
    <StyledClipboardCopy>
      <div className="content">
        <h1 className="heading-2 title_text">Success</h1>
        <ContentCopyIcon className="copy_icon" color="secondary" />
        <h1 className="heading-2 title_text">Copied to the clipboard!</h1>
        <h2 className="body-1 how_to_copy_text">
          Type command-v to paste in any text app
        </h2>
        <h2 className="body-2 disclaimer_text">
          This window will automatically close in 5 seconds
        </h2>
      </div>
      <MaterialUIButton
        variant="contained"
        color="secondary"
        onClick={() => {
          setCurrentScreen("SEARCH_SCREEN");
        }}
      >
        Go Back To Commands
      </MaterialUIButton>
    </StyledClipboardCopy>
  );
};

export default ClipboardCopy;
