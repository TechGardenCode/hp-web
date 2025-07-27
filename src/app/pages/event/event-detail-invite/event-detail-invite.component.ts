import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { UserParty } from '../../../model/event.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InviteService } from '../../../services/invite.service';
import { ToastService } from '../../../components/toast/toast.service';

@Component({
  selector: 'app-event-detail-invite',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './event-detail-invite.component.html',
  styleUrl: './event-detail-invite.component.css',
})
export class EventDetailInviteComponent implements OnInit {
  event!: UserParty;
  friends: any[] = [];
  inviteSearchForm = new FormControl('');
  searchValue: string = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly inviteService: InviteService,
    private readonly toastService: ToastService
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

    this.inviteSearchForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          this.searchValue = value || '';
        },
      });
  }

  inviteFriendByEmail(email: string) {
    this.inviteService.inviteFriend(this.event.party.id, { email }).subscribe({
      next: () => {
        this.router.navigate(['..']);
      },
    });
  }

  inviteFriendByUsername(username: string) {
    this.inviteService
      .inviteFriend(this.event.party.id, { username })
      .subscribe({
        next: () => {
          this.router.navigate(['..']);
        },
      });
  }

  async handleShare() {
    const title = document.title;
    const url = window.location.href.replace(/\/invite\/?$/, '');
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    let isMobile = mediaQuery.matches;

    try {
      if (navigator.share && isMobile) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        this.toastService.showToast(
          { title: 'Link copied to clipboard!' },
          { type: 'success' }
        );
      } else {
        console.error('Sharing is not supported in this browser.');
        throw new Error('Sharing is not supported in your browser.');
      }
    } catch (error) {
      console.error(
        'Error sharing:',
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}
