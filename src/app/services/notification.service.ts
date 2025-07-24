import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../model/page.model';
import { Notification } from '../model/notification.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly http: HttpClient) {}

  getAllNotifications() {
    return this.http.get<Page<Notification>>(
      `${environment.gatewayApiUrl}/notifications/all`
    );
  }

  markAsRead(notificationId: string) {
    return this.http.post(
      `${environment.gatewayApiUrl}/notifications/${notificationId}/read`,
      {}
    );
  }
}
