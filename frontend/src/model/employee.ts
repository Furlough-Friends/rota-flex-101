import { BaseEmployee } from './api';

export interface Employee extends BaseEmployee {
  readonly id: number;
}
