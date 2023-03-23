import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, scan, Observable, startWith, take, takeWhile, of } from 'rxjs';

import { COUNTER, MAX_COUNTER_VALUE, PERIOD, TOKEN } from './auth/auth.constant';
import { User } from './auth/auth.model';

const API = 'http://localhost:3000/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public counter$: Observable<number>;
  public isLoggedIn$: BehaviorSubject<boolean>;
  constructor(private http: HttpClient) {
    this.counter$ = new Observable();
    this.isLoggedIn$ = new BehaviorSubject(this.isLoggedIn());
  }

  login(user: User): Observable<object> {
    return this.http.post(API, user).pipe(take(1));
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(COUNTER);
    this.isLoggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    const result = !!localStorage.getItem(TOKEN);
    if (result) {
      this.startCounter();
    }
    return result;
  }

  setCurrentUser(): void {
    localStorage.setItem(TOKEN, 'true');
    this.isLoggedIn$.next(true);
    this.startCounter();
  }

  startCounter(): void {
    const data = localStorage.getItem(COUNTER);
    const initialValue = !!data && parseInt(data) || 0;
    this.counter$ = interval(PERIOD)
      .pipe(
        startWith(initialValue),
        scan((count: number) => {
          const result = count + 1;
          localStorage.setItem(COUNTER, result.toString());
          return result;
        }),
        takeWhile((count: number) => count <= MAX_COUNTER_VALUE)
      );
  }

  setCounter(): void {
    localStorage.setItem(COUNTER, '290');
    location.reload();
  }
}
