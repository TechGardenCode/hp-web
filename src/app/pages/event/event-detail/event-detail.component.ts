import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { InviteStatus, UserParty } from '../../../model/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../../../components/button/button.directive';
import { InviteStatusEmojiPipe } from '../../../pipes/invite-status-emoji.pipe';

@Component({
  selector: 'app-event-detail',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ButtonDirective,
    InviteStatusEmojiPipe,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  event!: UserParty;
  rsvpStatusOptions: Record<string, InviteStatus> = {
    Accept: 'ACCEPTED',
    Decline: 'DECLINED',
    Maybe: 'MAYBE',
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const eventId = params['id'];
      this.eventService.getEventById(eventId).subscribe({
        next: (event?: UserParty) => {
          if (!event) {
            this.router.navigate(['/']);
            return;
          }
          this.event = event;
        },
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate(['/']);
          }
        },
      });
    });
  }

  rsvp(status: InviteStatus) {
    this.event.invite.status = status;
    // Here you would typically call a service to update the RSVP status in the backend
    console.log(`RSVP status updated to: ${status}`);
  }
}
