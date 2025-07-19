import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'houseparty';
  appLoading = true;

  constructor(private readonly keycloak: Keycloak) {}

  async ngOnInit() {
    if (! this.keycloak.authenticated) {
      await this.keycloak.login();
    }
    this.appLoading = false;
  }
}
