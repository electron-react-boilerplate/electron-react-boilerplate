import { sendMessage } from 'utils';

/**
 * price changer subscriber
 * @param param0 symbols - ['btc', 'bnb', 'eth']
 * @returns {socket: WebSocket}
 */
export function subscribeToBinancePrice({
  symbols = ['btc', 'bnb', 'eth'],
  onMessage,
}: {
  symbols?: string[];
  onMessage?: Function;
}): { socket: WebSocket } {
  const socket = new WebSocket(
    `wss://fstream.binance.com/stream?streams=${symbols
      .map((x) => `${x}usdt@aggTrade`)
      .join('/')}`
  );

  socket.addEventListener('open', () => {
    console.log(`=== Subscribed ${Date.now()}`);
    const message = {
      id: '043a7cf2-bde3-4888-9604-c8ac41fcba4d',
      method: 'ticker.price',
      params: {
        symbols: [...symbols],
      },
    };
    sendMessage({ socket, message });
  });

  socket.addEventListener('message', (m) => {
    const parsed = JSON.parse(m.data);
    if (!parsed.data) {
      console.error({ parsed });
      return;
    }
    const {
      data: { s, p },
    } = parsed;
    if (onMessage) {
      onMessage({ symbol: s, price: p });
    }
  });

  return {
    socket,
  };
}
