import SendKeys from 'send-keys-native';
import io from 'socket.io-client';

export const SLIDE_UP = 'SlideUp';
export const SLIDE_DOWN = 'SlideDown';
export const PLAY_MEDIA = 'PlayMedia';

const socket = io('https://universalpresenterremote.com');

type messageType = {
  action: string,
  holdfor: string
};

function listenForEvents(token: string, holdFor: string) {
  socket.on(token, (message: messageType) => {
    if (message.holdfor === holdFor) {
      switch (message.action) {
        case SLIDE_UP: {
          SendKeys.rightArrow();
          break;
        }
        case SLIDE_DOWN: {
          SendKeys.leftArrow();
          break;
        }
        case PLAY_MEDIA: {
          SendKeys.rightArrow();
          break;
        }
        default:
          break;
      }
    }
  });
}

export default {
  listenForEvents
};
