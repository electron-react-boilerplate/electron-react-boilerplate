import { ResponseData } from 'types/api';

export interface ApiResponseListProps {
  data: ResponseData;
}

export interface ResultItem {
  result: string;
  resultDescription: string;
}

export interface Results extends Array<ResultItem> {}
