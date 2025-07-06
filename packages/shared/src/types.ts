export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'production' | 'test';
}

export interface Logger {
  info: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}