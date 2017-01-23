import { SET_EXPLORER_CONTENT } from '../constants';

const initialExplorerState = {
  explorerContent: ''
};

export default function (state = initialExplorerState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_EXPLORER_CONTENT:
      newState.explorerContent = action.explorerContent;
      break;
    default:
      return state;
  }
  return newState;
}