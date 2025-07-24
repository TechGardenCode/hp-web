import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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
    InviteStatusEmojiPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  badgeEventTypes: HousePartyEventType[] = ['upcoming', 'pending', 'past'];
  profile?: KeycloakProfile;
  isEventListOverflow = false;

  loading = {
    stats: true,
    events: true,
  };

  events: {
    loading: boolean;
    upcoming: number;
    pending: number;
    past: number;
    eventType: HousePartyEventType;
    data?: Page<UserParty>;
  } = {
    loading: true,
    upcoming: 0,
    pending: 0,
    past: 0,
    eventType: 'upcoming',
    data: undefined,
  };

  constructor(
    private readonly eventService: EventService,
    private readonly profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loading.events = true;
    this.eventService.getEventStats().subscribe((stats: any) => {
      this.events = { ...this.events, ...stats };
      this.loading.stats = false;
    });
    this.selectEvent('upcoming');
    this.profileService.initProfile();
    this.profileService.keycloakSubject.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
      }
    });
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  getEventByBadgeStatus(badgeStatus: HousePartyEventType) {
    this.loading.events = true;
    this.eventService.getEventByBadgeStatus(badgeStatus).subscribe({
      next: (events: Page<UserParty>) => {
        this.events.data = events;
        this.onResize();
        this.loading.events = false;
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

  @HostListener('window:resize', [])
  onResize() {
    const cardWidth = 250;
    const cardMargin = 16;
    const cardGap = 8;
    const contentWidth =
      cardWidth +
      cardMargin +
      cardMargin +
      (this.events.data?.content.length || 0) * (cardWidth + cardMargin) +
      (this.events.data?.content.length || 0) * cardGap;
    if (window.innerWidth >= contentWidth) {
      this.isEventListOverflow = true;
    } else {
      this.isEventListOverflow = false;
    }
  }
}
