import { Unit } from './constants';

export interface Item {
  uid?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  categories?: { title?: string; uid?: string }[];
  unit?: Unit;
  amount?: number;
}
