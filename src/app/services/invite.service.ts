import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Invite, InviteStatus } from '../model/event.model';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(private readonly http: HttpClient) {}

  inviteFriend(
    partyId: string,
    { email, username }: { email?: string; username?: string }
  ) {
    const params = new HttpParams()
      .set('email', email || '')
      .set('username', username || '');
    return this.http.post(
      `${environment.gatewayApiUrl}/invites/create/${partyId}`,
      null,
      { params }
    );
  }

  updateInviteStatus(inviteId: string, status: InviteStatus) {
    return this.http.put<Invite>(
      `${environment.gatewayApiUrl}/invites/${inviteId}/${status}`,
      null
    );
  }

  getInvitesByPartyId(partyId: string) {
    return this.http.get<Page<Invite>>(
      `${environment.gatewayApiUrl}/invites/party/${partyId}`
    );
  }
}
