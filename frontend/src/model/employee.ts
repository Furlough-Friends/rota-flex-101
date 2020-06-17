import { BaseEmployee } from './api';

export interface Employee extends BaseEmployee {
  readonly id: number;
  readonly hourlyRate: number;
  readonly contractedHours: number;
}
