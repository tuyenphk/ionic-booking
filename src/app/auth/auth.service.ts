import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userIsAuthenticatedUnderline = false;

  get userIsAuthenticated() {
    return this.userIsAuthenticatedUnderline;
  }
  constructor() { }

  login() {
    this.userIsAuthenticatedUnderline = true;
  }

  logout() {
    this.userIsAuthenticatedUnderline = false;
  }
}
