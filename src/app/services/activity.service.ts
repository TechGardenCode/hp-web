import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Page } from '../model/page.model';
import { Activity } from '../model/activity.type';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private readonly http: HttpClient) {}

  getActivityByPartyId(partyId: string) {
    return this.http.get<Page<Activity>>(
      `${environment.gatewayApiUrl}/parties/${partyId}/activity`
    );
  }

  createActivity(activity: Partial<Activity>) {
    return this.http.post<Activity>(
      `${environment.gatewayApiUrl}/activity`,
      activity
    );
  }
}
