import { OperationStatus, Output, BrokerAPI } from 'types';
import { send } from './helpers';

export function makeBinanceBroker(): BrokerAPI {
  async function ping(): Promise<Output> {
    return send({ path: 'ping' });
  }

  async function getPrice({ ticker }: { ticker: string }): Promise<Output> {
    console.log({ ticker });
    return send({ path: 'ticker/price' });
  }

  async function getPrices(): Promise<Output> {
    return send({ path: 'ticker/price' });
  }

  async function getTradingHistory(): Promise<Output> {
    return {
      value: {},
      status: OperationStatus.succeeded,
    };
  }

  return {
    ping,
    getTradingHistory,
    getPrice,
    getPrices,
  };
}
