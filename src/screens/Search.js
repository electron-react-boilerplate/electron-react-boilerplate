import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import cx from "classnames";
// import { Auth } from "@aws-amplify/auth";
// import { API } from "@aws-amplify/api";
import CircularProgress from "@mui/material/CircularProgress";

import useGlobalState from "../global/GlobalSate";

const StyledSearch = styled.div`
  display: flex;
  justify-content: flex-start;
  width: -webkit-fill-available;
  flex-direction: column;
  align-items: center;
  padding: 24px 24px 12px 24px;
  // TODO: SHOULD BE DYNAMIC WITH PADDING
  height: calc(100vh - 36px);
  position: relative;

  .main__input {
    color: white;
    width: 100%;

    input {
      color: var(--color-white);
    }
  }

  .command_list {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    .loading_spinner {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .command {
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      align-items: center;

      :hover {
        cursor: pointer;
        background-color: var(--color-light-grey);
        border-radius: 4px;
      }
    }

    .selected.command {
      background-color: var(--color-secondary);
      border-radius: 4px;
    }
  }

  .keyboard_options {
    width: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: space-around;

    .keyboard_option {
      display: flex;
      color: var(--color-light-grey);

      .key {
        color: var(--color-white);
        padding-right: 8px;
      }

      .enter_key {
        margin-top: 4px;
      }
    }
  }
`;

const Search = ({ setCurrentScreen }) => {
  const [searchText, setSearchText] = useState("");

  const {
    availableCommands,
    setAvailableCommands,
    setSelectedCommandIndex,
    selectedCommandIndex,
  } = useGlobalState();

  // const searchScreenRef = useRef(null);

  // useEffect(() => {
  //   searchScreenRef.current.focus();
  // }, []);

  // TODO: WORK WITH STEFAN TO USE AUTH SECURELY
  useEffect(() => {
    // API.get("main", "/commands")
    //   .then((response) => {
    //     setAvailableCommands(response);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
  }, [setAvailableCommands]);

  const handKeyNav = (key) => {
    if (key === "ArrowDown") {
      if (selectedCommandIndex < availableCommands.length - 1) {
        setSelectedCommandIndex(selectedCommandIndex + 1);
      } else {
        setSelectedCommandIndex(0);
      }
    } else if (key === "ArrowUp") {
      if (selectedCommandIndex > 0) {
        setSelectedCommandIndex(selectedCommandIndex - 1);
      } else {
        setSelectedCommandIndex(availableCommands.length - 1);
      }
    } else if (key === "Enter") {
      setCurrentScreen("COMMAND_SCREEN");
    } else if (key === "=") {
      // void Auth.signOut().then(() => {
      //   setCurrentScreen("AUTH_SCREEN");
      // });
    }
  };

  return (
    <StyledSearch
      tabIndex="0"
      onKeyDown={(e) => {
        handKeyNav(e.key);
      }}
    >
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="main__input"
        placeholder="Select Command..."
        variant="standard"
        autoFocus
      />
      <div className="command_list">
        {availableCommands.length ? (
          availableCommands.map(({ name }, i) => {
            return (
              (name.toUpperCase().includes(searchText.toUpperCase()) ||
                searchText.length === 0) && (
                <div
                  className={cx("command", {
                    selected: selectedCommandIndex === i,
                  })}
                  onClick={() => {
                    setSelectedCommandIndex(i);
                  }}
                >
                  <div className="body-2">{name}</div>
                  <div>{i + 1}</div>
                </div>
              )
            );
          })
        ) : (
          <div className="loading_spinner">
            <CircularProgress />
          </div>
        )}
      </div>
      <div className="keyboard_options">
        <h6 className="keyboard_option label">
          <span className="key">↑↓</span>to navigate
        </h6>
        <h6 className="keyboard_option label">
          <span className="key enter_key">↵</span>to use
        </h6>
        <h6 className="keyboard_option label">
          <span className="key">esc</span>to dismiss
        </h6>
        <h6 className="keyboard_option label">
          <span className="key">=</span>to logout
        </h6>
      </div>
    </StyledSearch>
  );
};

export default Search;
