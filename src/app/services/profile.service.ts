import { Injectable } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  keycloakSubject = new BehaviorSubject<KeycloakProfile | undefined>(undefined);

  constructor(private readonly keycloak: Keycloak) {}

  async initProfile() {
    if (!this.keycloakSubject.value) {
      this.keycloakSubject.next(await this.keycloak.loadUserProfile());
    }
  }

  async logout() {
    await this.keycloak.logout();
    this.keycloakSubject.next(undefined);
  }
}
