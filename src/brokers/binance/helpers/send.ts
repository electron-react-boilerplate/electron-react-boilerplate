import { OperationStatus, Output } from 'types';

export async function send({
  path,
  url = 'https://api.binance.com/api/v3',
  method = 'GET',
}: {
  path: string;
  url?: string;
  method?: 'GET' | 'POST';
}): Promise<Output> {
  try {
    const r = await fetch(`${url}/${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    return {
      status: OperationStatus.succeeded,
      value: await r.json(),
    };
  } catch (err) {
    return {
      errors: [err],
      status: OperationStatus.failed,
    };
  }
}
