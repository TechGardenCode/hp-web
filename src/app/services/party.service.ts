import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HousePartyEvent } from '../model/event.model';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(private readonly http: HttpClient) {}

  getParty(id: string) {
    return this.http.get<HousePartyEvent>(
      `${environment.gatewayApiUrl}/parties/${id}`
    );
  }

  createParty(partyData: any) {
    return this.http.post(`${environment.gatewayApiUrl}/parties`, partyData);
  }

  updateParty(id: string, partyData: any) {
    return this.http.put(
      `${environment.gatewayApiUrl}/parties/${id}`,
      partyData
    );
  }

  deleteParty(id: string) {
    return this.http.delete(`${environment.gatewayApiUrl}/parties/${id}`);
  }
}
