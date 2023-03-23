import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { AuthService } from '../auth.service';
import { User } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public user: User;
  public isLoggedIn: boolean;
  public isLoading: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.user = { username: '', password: '' };
    this.authService.isLoggedIn$.subscribe((result: boolean) => this.isLoggedIn = result);
  }

  login(data: User) {
    this.isLoading = true;
    this.authService.login(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => this.authService.setCurrentUser());
  }


}
