import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventCreateComponent } from './pages/event/event-create/event-create.component';
import { EventDetailComponent } from './pages/event/event-detail/event-detail.component';

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
