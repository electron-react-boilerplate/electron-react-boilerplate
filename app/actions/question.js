// @flow
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const INITIALIZE = 'INITIALIZE';

export function answer(index: number) {
  return {
    type: ANSWER_QUESTION,
    index
  };
}

export function init() {
  return {
    type: INITIALIZE
  };
}
