import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { InviteStatus, UserParty } from '../../../model/event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../../../components/button/button.directive';
import { InviteStatusEmojiPipe } from '../../../pipes/invite-status-emoji.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroPencilMicro,
  heroMegaphoneMicro,
  heroUserPlusMicro,
  heroEllipsisHorizontalMicro,
} from '@ng-icons/heroicons/micro';
import { ActivityService } from '../../../services/activity.service';
import { Page } from '../../../model/page.model';
import { Activity } from '../../../model/activity.type';

@Component({
  selector: 'app-event-detail',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ButtonDirective,
    InviteStatusEmojiPipe,
    NgIcon,
    RouterModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
  viewProviders: [
    provideIcons({
      heroPencilMicro,
      heroMegaphoneMicro,
      heroUserPlusMicro,
      heroEllipsisHorizontalMicro,
    }),
  ],
})
export class EventDetailComponent implements OnInit {
  event!: UserParty;
  activity!: Page<Activity>;
  rsvpStatusOptions: Record<string, InviteStatus> = {
    Accept: 'ACCEPTED',
    Decline: 'DECLINED',
    Maybe: 'MAYBE',
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly activityService: ActivityService
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
          this.getActivity(eventId);
        },
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate(['/']);
          }
        },
      });
    });
  }

  getActivity(eventId: string) {
    this.activityService.getActivityByPartyId(eventId).subscribe({
      next: (activity) => {
        this.activity = activity;
      },
      error: (err) => {
        console.error('Error fetching activity:', err);
      },
    });
  }

  rsvp(status: InviteStatus) {
    this.event.invite.status = status;
    // Here you would typically call a service to update the RSVP status in the backend
    console.log(`RSVP status updated to: ${status}`);
  }

  addComment({ target }: any) {
    const content = target.value.trim();
    if (!content) {
      return;
    }

    const activity: Partial<Activity> = {
      partyId: this.event.party.id,
      type: 'COMMENT',
      content,
    };

    this.activityService.createActivity(activity).subscribe({
      next: (newActivity) => {
        this.activity.content.unshift(newActivity);
        target.value = '';
      },
      error: (err) => {
        console.error('Error creating activity:', err);
      },
    });
  }

  addReaction(activity: Activity, reaction: string) {
    const newActivity: Partial<Activity> = {
      partyId: this.event.party.id,
      type: 'REACTION',
      content: reaction,
      parent: activity,
    };
    this.activityService.createActivity(newActivity).subscribe({
      next: (createdActivity) => {
        if (!activity.children) {
          activity.children = [];
        }
        activity.children.push(createdActivity);
      },
      error: (err) => {
        console.error('Error adding reaction:', err);
      },
    });
  }

  addReply(activity: Activity, content: string) {
    if (!content.trim()) {
      return;
    }
    const newActivity: Partial<Activity> = {
      partyId: this.event.party.id,
      type: 'REPLY',
      content: content.trim(),
      parent: activity,
    };
    this.activityService.createActivity(newActivity).subscribe({
      next: (createdActivity) => {
        if (!activity.children) {
          activity.children = [];
        }
        activity.children.push(createdActivity);
      },
      error: (err) => {
        console.error('Error adding reply:', err);
      },
    });
  }

  getReactionCount(activity: Activity, reaction: string): number {
    return (
      activity.children?.filter(
        (child) => child.type === 'REACTION' && child.content === reaction
      ).length || 0
    );
  }

  getMessageReplies(message: Activity): Activity[] {
    return message.children?.filter((child) => child.type === 'REPLY') || [];
  }
}
