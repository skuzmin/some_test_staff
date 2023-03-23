import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './auth.service';
import { BlockingDialogComponent } from './blocking-dialog/blocking-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((result: boolean) => this.isLoggedIn = result);
    this.authService.counter$
      .subscribe({ complete: () => this.dialog.open(BlockingDialogComponent, { disableClose: true }).afterClosed() });
  }
}
