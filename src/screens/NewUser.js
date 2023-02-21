import React from "react";
import styled from "styled-components";

import LogoIcon from "../icons/Logo_Icon";

const StyledNewUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10%;

  .logo_icon {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
  }
`;

const NewUser = () => {
  return (
    <StyledNewUser>
      <div className="content">
        <LogoIcon className="logo_icon" />
        <h1 className="body-1">
          You are logged in. To use Indigo, copy text to the clipboard (if
          relevant) and enter option-i. You can now close this window
        </h1>
      </div>
    </StyledNewUser>
  );
};

export default NewUser;
