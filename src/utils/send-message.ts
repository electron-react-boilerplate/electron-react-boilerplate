export function sendMessage({
  socket,
  message,
}: {
  socket: WebSocket;
  message: Record<string, unknown>;
}) {
  socket.send(JSON.stringify(message));
}
