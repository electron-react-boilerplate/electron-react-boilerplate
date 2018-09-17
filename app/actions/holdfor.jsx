export const SET_HOLD_FOR = 'SET_HOLD_FOR';
export const CLEAR_HOLD_FOR = 'CLEAR_HOLD_FOR';

export function setHoldFor(holdFor: string) {
  return {
    type: SET_HOLD_FOR,
    payload: holdFor
  };
}

export function clearHoldFor() {
  return {
    type: CLEAR_HOLD_FOR
  };
}
