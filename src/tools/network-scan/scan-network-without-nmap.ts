import { Socket } from 'net';
import readline from 'readline';
import os from 'os';
import { Telnet } from 'telnet-client';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the host to scan: ', (host: string) => {
  rl.question('Enter the start port: ', (startPort: string) => {
    rl.question('Enter the end port: ', (endPort: string) => {
      for (
        let port = parseInt(startPort, 10);
        port <= parseInt(endPort, 10);
        // eslint-disable-next-line no-plusplus
        port++
      ) {
        const socket = new Socket();
        socket.setTimeout(800);
        socket.on('connect', () => {
          console.log(`Port ${port} is open`);
          socket.destroy();
        });
        socket.on('timeout', () => {
          // console.log(`Port ${port} is closed`);
          socket.destroy();
        });
        socket.on('error', (err: any) => {
          if (err.code === 'ECONNREFUSED') {
            // console.log(`Port ${port} is closed`);
          }
          socket.destroy();
        });
        socket.connect(port, host);
      }
      rl.close();
    });
  });
});
