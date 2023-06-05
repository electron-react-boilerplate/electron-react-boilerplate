import { BrokerAPI, Output, BotAPI } from 'types';

export function useBroker({ broker }: { broker: BrokerAPI }): BotAPI {
  async function ping(): Promise<Output> {
    return broker.ping();
  }

  async function getPrice({ ticker }: { ticker: string }): Promise<Output> {
    return broker.getPrice({ ticker });
  }

  async function getPrices(): Promise<Output> {
    return broker.getPrices();
  }

  return {
    ping,
    getPrice,
    getPrices,
  };
}
