import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class JwtService {
  TOKEN_KEY = 'token'

  getToken(): string {
    return window.localStorage[this.TOKEN_KEY];
  }  
  
  saveToken(token: string) {
    window.localStorage.setItem(this.TOKEN_KEY, token)
  }

  removeToken() {
    window.localStorage.removeItem(this.TOKEN_KEY)
  }
}