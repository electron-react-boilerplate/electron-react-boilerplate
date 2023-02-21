import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import MaterialUIButton from '@mui/material/Button';
import { Auth } from '@aws-amplify/auth';
// import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import LogoIcon from '../icons/Logo_Icon';

import useGlobalState from '../global/GlobalSate';

const StyledAuthentication = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;

  .logo_icon {
    margin-bottom: 24px;
  }

  .heading-1 {
    margin-bottom: 24px;
    width: 400px;
  }

  .subheading_text {
    margin-bottom: 24px;
    color: var(--color-light-grey);
  }

  .text_field {
    margin-bottom: 24px;
    width: 400px;

    .visibility_icon:hover {
      cursor: pointer;
    }
  }

  .or_group {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .caption {
      margin: 0 8px;
      color: var(--color-white);
    }

    .or_line {
      border-bottom: 1px solid var(--color-white);
      width: 100%;
    }
  }

  .auth_options {
    .auth_option {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        position: relative;

        svg {
          position: absolute;
          left: 8px;
          margin-right: 8px;
        }
      }
    }
  }

  .error_text {
    color: var(--color-red);
    margin-bottom: 24px;
  }

  .button_group {
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
      width: unset;
    }
  }

  button {
    margin-bottom: 24px;
    width: 400px;
    color: var(--color-primary);
  }
`;

const Authentication = ({ setCurrentScreen }) => {
  const [authFormInView, setAuthFormInView] = useState('SIGN_UP');

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { setGlobalLoading } = useGlobalState();

  useEffect(() => {
    setErrorText('');
  }, [userEmail, password, code, setErrorText, authFormInView]);

  const handleSignUpUser = async () => {
    try {
      await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true },
      });
      setAuthFormInView('CONFIRM_EMAIL');
    } catch (error) {
      console.log('error signing up:', error);
      setErrorText(error?.message);
    }
  };

  const handleConfirmSignUpUser = async () => {
    try {
      const response = await Auth.confirmSignUp(userEmail, code);
      setCurrentScreen('NEW_USER_SCREEN');
      console.log('NEW USER RES', response);
    } catch (error) {
      console.log('error confirming sign up', error);
      setErrorText(error?.message);
    }
  };

  const handleSignInUser = async () => {
    setGlobalLoading(true);
    try {
      let userData = await Auth.signIn(userEmail, password);
      setCurrentScreen('SEARCH_SCREEN');
      console.log('USER DATA', userData);
      setGlobalLoading(false);
    } catch (error) {
      console.log('error signing in', error);
      setGlobalLoading(false);
      setErrorText(error?.message);
    }
  };

  return (
    <StyledAuthentication>
      <LogoIcon className="logo_icon" />
      {authFormInView === 'SIGN_UP' && (
        <>
          <TextField
            className="text_field"
            variant="outlined"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            className="text_field"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className="visibility_icon"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <h6 className="label error_text">{errorText}</h6>
          <MaterialUIButton
            variant="outlined"
            onClick={() => {
              void handleSignUpUser();
            }}
          >
            Sign Up
          </MaterialUIButton>

          {/* <div className="or_group">
            <div className="or_line" />
            <h5 className="caption"> OR </h5>
            <div className="or_line" />
          </div> 
           <div className="auth_options">
            <div className="auth_option">
              <MaterialUIButton
                color="secondary"
                variant="contained"
                onClick={() => {
                  void Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Google
                  })
                }}
              >
                <GoogleIcon color="primary" />
                Google
              </MaterialUIButton>
            </div>
            <div className="auth_option">
              <MaterialUIButton
                color="secondary"
                variant="contained"
                onClick={() => {
                  void Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Facebook
                  })
                }}
              >
                <FacebookIcon color="primary" />
                Facebook
              </MaterialUIButton>
            </div>
          </div> */}
          <MaterialUIButton
            variant="text"
            onClick={() => {
              setAuthFormInView('SIGN_IN');
            }}
          >
            I have an account
          </MaterialUIButton>
        </>
      )}
      {authFormInView === 'CONFIRM_EMAIL' && (
        <>
          <h3 className="heading-1">Confirm Sign Up</h3>
          <h4 className="caption subheading_text">
            A code has been sent to your email
          </h4>
          <TextField
            className="text_field"
            variant="outlined"
            label="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <h6 className="label error_text">{errorText}</h6>
          <div className="button_group">
            <MaterialUIButton
              variant="outlined"
              onClick={() => {
                setAuthFormInView('SIGN_UP');
              }}
            >
              Back
            </MaterialUIButton>
            <MaterialUIButton
              variant="filled"
              onClick={() => {
                void handleConfirmSignUpUser();
              }}
            >
              Verify Code
            </MaterialUIButton>
          </div>
        </>
      )}
      {authFormInView === 'SIGN_IN' && (
        <>
          <TextField
            className="text_field"
            variant="outlined"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            className="text_field"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className="visibility_icon"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <h6 className="label error_text">{errorText}</h6>
          <MaterialUIButton
            variant="outlined"
            onClick={() => {
              void handleSignInUser();
            }}
          >
            Log In
          </MaterialUIButton>
          <MaterialUIButton
            variant="text"
            onClick={() => {
              setAuthFormInView('SIGN_UP');
            }}
          >
            I don't have an account
          </MaterialUIButton>
        </>
      )}
    </StyledAuthentication>
  );
};

export default Authentication;
