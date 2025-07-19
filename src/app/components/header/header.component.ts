import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { ProfileService } from '../../services/profile.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroBellAlertMicro,
  heroBellMicro,
  heroChatBubbleOvalLeftEllipsisMicro,
  heroChatBubbleOvalLeftMicro,
  heroHomeModernMicro,
  heroUserCircleMicro,
} from '@ng-icons/heroicons/micro';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  viewProviders: [
    provideIcons({
      heroHomeModernMicro,
      heroBellMicro,
      heroBellAlertMicro,
      heroChatBubbleOvalLeftMicro,
      heroChatBubbleOvalLeftEllipsisMicro,
      heroUserCircleMicro
    }),
  ],
})
export class HeaderComponent implements OnInit {
  profile?: KeycloakProfile;
  hasAlerts = false;
  hasMessages = false;

  constructor(private readonly profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.initProfile();
    this.profileService.keycloakSubject.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
      }
    });
  }

  logout() {
    this.profileService.logout();
    this.profile = undefined;
  }
}
