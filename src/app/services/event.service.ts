import { Injectable } from '@angular/core';
import { HousePartyEvent, UserParty } from '../model/event.model';
import { delay, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada, ex accumsan congue accumsan, metus dolor venenatis justo, iaculis maximus dui nisl nec tellus. Nam a tempor nunc, ut auctor urna. Donec ac turpis ac nulla rutrum varius et vitae justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam in mauris augue. Suspendisse gravida tristique diam eget consequat. Mauris ac nisl ex. Morbi eu magna ultricies, volutpat elit eu, cursus ipsum. Nullam mollis dui ac orci tempor, vitae elementum dui fermentum.

Quisque eleifend tempor velit nec egestas. Curabitur condimentum, tortor sed accumsan tempus, risus neque tempor tellus, quis viverra tortor justo ut enim. Integer maximus, nibh vitae facilisis finibus, turpis ligula congue odio, vitae posuere ante est at quam. Maecenas eleifend finibus laoreet. Pellentesque elementum a mi nec dignissim. Ut bibendum malesuada sem non aliquam. Quisque luctus suscipit mi, id venenatis orci malesuada a. Vestibulum rhoncus odio at tortor facilisis condimentum. Integer quis rutrum tellus, ornare sagittis urna.

Vivamus convallis vel elit eget faucibus. Curabitur ipsum sem, pulvinar eu ultrices non, accumsan at massa. Vestibulum tempor convallis tincidunt. Duis interdum dapibus aliquam. Maecenas luctus, nunc eget interdum mattis, arcu libero semper purus, eu consectetur justo metus et felis. Donec in leo ac diam dignissim pharetra. Suspendisse scelerisque odio id nulla elementum sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie sagittis orci, a suscipit velit mattis in. Phasellus ligula odio, blandit ut luctus dapibus, facilisis at turpis. Vivamus id gravida purus, gravida lacinia ipsum.`;

  eventData: Record<string, Partial<HousePartyEvent>[]> = {
    upcoming: [
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000000',
        startDateTime: new Date('2023-10-01T10:00:00Z'),
        endDateTime: new Date('2023-10-01T12:00:00Z'),
        title: 'Upcoming Event 1',
        rsvpStatus: 'going',
        hosts: [],
        imageUrl:
          'https://fastly.picsum.photos/id/428/250/250.jpg?hmac=Vt7Cqd_Wrp3H_p53-AD-kVVk-kqm-xIZvrN1ya2XR88',
        location: 'New York, NY',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000001',
        startDateTime: new Date('2023-10-02T10:00:00Z'),
        endDateTime: new Date('2023-10-02T12:00:00Z'),
        title: 'Upcoming Event 2',
        rsvpStatus: 'maybe',
        hosts: [],
        imageUrl:
          'https://fastly.picsum.photos/id/519/250/250.jpg?hmac=qLYP70hTZUqt6QaqZD01fC0v2keD8Mu8L8hFrcyc5EI',
        location: 'Los Angeles, CA',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000002',
        startDateTime: new Date('2023-10-03T10:00:00Z'),
        endDateTime: new Date('2023-10-03T12:00:00Z'),
        title: 'Upcoming Event 3',
        rsvpStatus: 'not going',
        hosts: [],
        imageUrl:
          'https://fastly.picsum.photos/id/1072/250/250.jpg?hmac=Ljs7SiVJgTcTS5dq-92Zsq4dvwgFGLyXRkZm4nbenMU',
        location: 'Chicago, IL',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000003',
        startDateTime: new Date('2023-10-04T10:00:00Z'),
        endDateTime: new Date('2023-10-04T12:00:00Z'),
        title: 'Upcoming Event 4',
        rsvpStatus: 'invited',
        hosts: [],
        imageUrl:
          'https://fastly.picsum.photos/id/693/250/250.jpg?hmac=8f4GekoBDCykOdxvljPkPPZt1fORFCWtpdCKsGlG1cw',
        location: 'Miami, FL',
        description: this.lipsum,
      },
    ],
    pending: [
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000004',
        startDateTime: new Date('2023-10-05T10:00:00Z'),
        endDateTime: new Date('2023-10-05T12:00:00Z'),
        title: 'Pending Event 1',
        rsvpStatus: 'invited',
        hosts: [],
        imageUrl:
          'https://fastly.picsum.photos/id/923/250/250.jpg?hmac=uxfbonMV9yOLhtgrQOExps20BJ7acVYbWdyNbLis3Uw',
        location: 'Seattle, WA',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000005',
        startDateTime: new Date('2023-10-06T10:00:00Z'),
        endDateTime: new Date('2023-10-06T12:00:00Z'),
        title: 'Pending Event 2',
        rsvpStatus: 'invited',
        hosts: [],
        imageUrl:
          'https://fastly.picsum.photos/id/867/250/250.jpg?hmac=MlZHVTv5ZZSE9duUOzKweH__ADAgg035hvFAt9PPFZw',
        location: 'Austin, TX',
        description: this.lipsum,
      },
    ],
    past: [
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000006',
        startDateTime: new Date('2023-09-01T10:00:00Z'),
        endDateTime: new Date('2023-09-01T12:00:00Z'),
        title: 'Past Event 1',
        rsvpStatus: 'going',
        hosts: [],
        imageUrl: 'https://picsum.photos/250',
        location: 'San Francisco, CA',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000007',
        startDateTime: new Date('2023-09-02T10:00:00Z'),
        endDateTime: new Date('2023-09-02T12:00:00Z'),
        title: 'Past Event 2',
        rsvpStatus: 'maybe',
        hosts: [],
        imageUrl: 'https://picsum.photos/250',
        location: 'Los Angeles, CA',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000008',
        startDateTime: new Date('2023-09-03T10:00:00Z'),
        endDateTime: new Date('2023-09-03T12:00:00Z'),
        title: 'Past Event 3',
        rsvpStatus: 'not going',
        hosts: [],
        imageUrl: 'https://picsum.photos/250',
        location: 'Chicago, IL',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000009',
        startDateTime: new Date('2023-09-04T10:00:00Z'),
        endDateTime: new Date('2023-09-04T12:00:00Z'),
        title: 'Past Event 4',
        rsvpStatus: 'invited',
        hosts: [],
        imageUrl: 'https://picsum.photos/250',
        location: 'Houston, TX',
        description: this.lipsum,
      },
      {
        id: '02998a0a-0c91-4c45-b3e6-00000000010',
        startDateTime: new Date('2023-09-05T10:00:00Z'),
        endDateTime: new Date('2023-09-05T12:00:00Z'),
        title: 'Past Event 5',
        rsvpStatus: 'going',
        hosts: [],
        imageUrl: 'https://picsum.photos/250',
        location: 'Houston, TX',
        description: this.lipsum,
      },
    ],
  };

  constructor(private readonly http: HttpClient) {}

  getEventByBadgeStatus(
    badgeStatus: 'upcoming' | 'pending' | 'past'
  ): Observable<Page<UserParty>> {
    switch (badgeStatus) {
      case 'upcoming':
        return this.http.get<Page<UserParty>>(
          `${environment.gatewayApiUrl}/events/upcoming`
        );
      default:
        return of().pipe(delay(250 + Math.random() * 750));
    }
  }

  getEventById(id: string): Observable<UserParty> {
    return this.http.get<UserParty>(`${environment.gatewayApiUrl}/events/detail/${id}`);
  }
}
