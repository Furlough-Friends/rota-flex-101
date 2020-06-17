import { EngagementType } from './engagementType';

export interface Engagement {
  readonly id: number;
  readonly staffId: number;
  readonly start: Date;
  readonly end: Date;
  readonly type: EngagementType;
}
