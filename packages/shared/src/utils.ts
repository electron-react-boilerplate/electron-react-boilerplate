export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

export const formatError = (error: Error): string => {
  return `[${error.name}] ${error.message}`;
};