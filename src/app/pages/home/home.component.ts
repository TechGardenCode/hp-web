import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  HousePartyEvent,
  HousePartyEventType,
  InviteStatus,
  UserParty,
} from '../../model/event.model';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ButtonDirective } from '../../components/button/button.directive';
import { ProfileService } from '../../services/profile.service';
import { KeycloakProfile } from 'keycloak-js';
import { Page } from '../../model/page.model';
import { InviteStatusEmojiPipe } from '../../pipes/invite-status-emoji.pipe';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    ButtonDirective,
    InviteStatusEmojiPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  badgeEventTypes: HousePartyEventType[] = ['upcoming', 'pending', 'past'];
  profile?: KeycloakProfile;

  events: {
    loading: boolean;
    upcoming: number;
    pending: number;
    past: number;
    eventType: HousePartyEventType;
    data?: Page<UserParty>;
  } = {
    loading: false,
    upcoming: 4,
    pending: 2,
    past: 5,
    eventType: 'upcoming',
    data: undefined,
  };

  constructor(
    private readonly eventService: EventService,
    private readonly profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.selectEvent('upcoming');
    this.profileService.initProfile();
    this.profileService.keycloakSubject.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
      }
    });
  }

  getEventByBadgeStatus(badgeStatus: HousePartyEventType) {
    this.events.loading = true;
    this.eventService.getEventByBadgeStatus(badgeStatus).subscribe({
      next: (events: Page<UserParty>) => {
        this.events.data = events;
        this.events.loading = false;
      },
    });
  }

  selectEvent(eventType: HousePartyEventType) {
    this.events.eventType = eventType;
    this.getEventByBadgeStatus(eventType);
  }

  eventStatusToEmoji(EventStatus: InviteStatus): string {
    switch (EventStatus) {
      case 'ACCEPTED':
        return '👍';
      case 'MAYBE':
        return '🤔';
      case 'DECLINED':
        return '👎';
      case 'PENDING':
        return '💌';
      default:
        return '';
    }
  }
}
