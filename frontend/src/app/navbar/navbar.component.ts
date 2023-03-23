import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public counter: Observable<string>;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.counter = this.authService.counter$
      .pipe(map((result: number) => this.getTimerValue(result)));
  }

  getTimerValue(counter: number): string {
    const date = new Date(counter * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  setTimerToFinish(): void {
    this.authService.setCounter();
  }
}