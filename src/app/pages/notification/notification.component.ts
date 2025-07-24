import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../model/notification.type';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService
      .getAllNotifications()
      .subscribe((notifications) => {
        this.notifications = notifications.content || [];
      });
  }

  onNotificationClick(notification: Notification): void {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.read = true;
        this.onNotificationClick(notification);
      });
      return;
    }
    if (notification.actionUrl) {
      this.router.navigate([notification.actionUrl]);
    }
  }
}
