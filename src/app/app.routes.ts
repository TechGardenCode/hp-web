import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventCreateComponent } from './pages/event/event-create/event-create.component';
import { EventDetailComponent } from './pages/event/event-detail/event-detail.component';
import { EventDetailInviteComponent } from './pages/event/event-detail-invite/event-detail-invite.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { EventEditComponent } from './pages/event/event-edit/event-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'notifications',
    component: NotificationComponent,
  },
  {
    path: 'event',
    children: [
      {
        path: 'create',
        component: EventCreateComponent,
      },
      {
        path: 'detail/:id',
        component: EventDetailComponent,
      },
      {
        path: 'edit/:id',
        component: EventEditComponent,
      },
      {
        path: 'detail/:id/invite',
        component: EventDetailInviteComponent,
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
