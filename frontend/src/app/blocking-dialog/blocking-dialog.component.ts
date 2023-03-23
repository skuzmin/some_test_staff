import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { interval, Observable, scan, startWith, takeWhile, tap } from 'rxjs';

import { PERIOD } from '../auth/auth.constant';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blocking-dialog',
  templateUrl: './blocking-dialog.component.html',
  styleUrls: ['./blocking-dialog.component.scss']
})

export class BlockingDialogComponent implements OnInit {
  public timer: Observable<number>;
  constructor(private dialogRef: MatDialogRef<BlockingDialogComponent>, private authService: AuthService) { }

  ngOnInit(): void {
    this.timer = interval(PERIOD)
      .pipe(
        startWith(60),
        scan((count: number) => count = count - 1),
        takeWhile((count: number) => count >= 0),
        tap((count: number) => {
          if(count === 0) {
            this.authService.logout();
            this.dialogRef.close();
          }
        })
      );
  }
}
