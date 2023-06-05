import { BotAPI } from './bot-api';
import { Output } from './output';

export type BrokerAPI = BotAPI & {
  getTradingHistory(): Promise<Output>;
};
