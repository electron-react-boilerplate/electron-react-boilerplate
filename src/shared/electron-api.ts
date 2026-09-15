export interface ElectronAPI {
  ping(message: string): Promise<string>;
}

export const IPC_PING = 'app:ping';
