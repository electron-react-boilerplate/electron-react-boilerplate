import { Output } from './output';

export type BotAPI = {
  ping(): Promise<Output>;
  getPrice({ ticker }: { ticker: string }): Promise<Output>;
  getPrices(): Promise<Output>;
};
