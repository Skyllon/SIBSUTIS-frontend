import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnDestroy {
  private subscription?: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
    this.subscription = this.notificationService.messages$.subscribe(msg => {
      this.snackBar.open(msg.text, 'OK', {
        duration: 3000,
        panelClass: [`toast-${msg.type}`],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
