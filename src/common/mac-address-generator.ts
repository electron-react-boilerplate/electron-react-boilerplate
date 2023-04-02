import crypto from 'crypto';

function generateMACAddress() {
  const macBuffer = crypto.randomBytes(6);
  // Set the local bit and the unicast bit
  // eslint-disable-next-line no-bitwise
  macBuffer[0] |= 0x2;
  // eslint-disable-next-line no-bitwise
  macBuffer[0] &= 0xfe;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return macBuffer.toString('hex').match(/../g).join(':');
}

const randomMACAddress = generateMACAddress();
