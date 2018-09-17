export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';

export function updateToken(event) {
  return {
    type: UPDATE_TOKEN,
    payload: { index: parseInt(event.target.id, 10), value: event.target.value }
  };
}

export function resetToken() {
  return {
    type: RESET_TOKEN
  };
}
