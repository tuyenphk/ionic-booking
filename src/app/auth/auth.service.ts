import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userIsAuthenticatedUnderline = false;
  private userIdline = 'abc';

  get userIsAuthenticated() {
    return this.userIsAuthenticatedUnderline;
  }

  get userId() {
    return this.userIdline;
  }

  constructor() { }

  login() {
    this.userIsAuthenticatedUnderline = true;
  }

  logout() {
    this.userIsAuthenticatedUnderline = false;
  }
}
