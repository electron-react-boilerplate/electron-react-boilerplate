import { SerialPort } from 'serialport';

// Create a port
const port = new SerialPort({
  path: '/dev/tty-usbserial1',
  baudRate: 57600,
  autoOpen: false,
});

export default function SerialDisplay() {
  return <div>{port.baudRate} </div>;
}
