import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
}
