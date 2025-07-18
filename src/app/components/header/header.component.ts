import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  profile?: KeycloakProfile;

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
