import { UserInfo } from "./user-info.model";

export interface UserParty {
  party: HousePartyEvent;
  invite: Invite;
  userInfo: any;
}

export interface HousePartyEvent {
  id: string;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  imageUrl: string;
  hostNickname: string;
  createdBy: any;
  location: string;
  spots: number;
  description: string;
  rsvpStatus: 'going' | 'not going' | 'maybe' | 'invited';
  hosts: any[];
}

export interface Invite  {
  id: string;
  partyId: string;
  user: UserInfo;
  invitedBy: UserInfo;
  status: InviteStatus;
}

export type HousePartyEventType = 'upcoming' | 'pending' | 'past';

export type InviteStatus = 'ACCEPTED' | 'DECLINED' | 'MAYBE' | 'PENDING';
