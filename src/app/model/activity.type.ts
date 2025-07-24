export interface Activity {
  id: string; // UUID as string
  partyId: string;
  user: any;
  type: ActivityType;
  parent?: Activity;
  children?: Activity[];
  content?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export type ActivityType = 'COMMENT' | 'REACTION' | 'REPLY' | 'STATUS';
