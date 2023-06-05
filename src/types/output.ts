export enum OperationStatus {
  'not-started' = 'not-started',
  'running' = 'running',
  'succeeded' = 'succeeded',
  'failed' = 'failed',
}

type SuccessOutput<T> = {
  value: T;
  status: OperationStatus.succeeded;
};

type FailedOutput = {
  status: OperationStatus.failed;
  errors: (unknown | Error)[];
};

export type Output<T = any> = SuccessOutput<T> | FailedOutput;
