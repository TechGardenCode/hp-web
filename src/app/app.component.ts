import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'houseparty';
  appLoading = true;

  constructor(private readonly keycloak: Keycloak, private readonly userService: UserService) {}

  async ngOnInit() {
    if (!this.keycloak.authenticated) {
      await this.keycloak.login();
    }
    this.appLoading = false;
    this.userService.getUserProfile().subscribe();
  }
}
