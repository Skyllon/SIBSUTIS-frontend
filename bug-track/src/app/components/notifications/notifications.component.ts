import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  constructor(
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
    this.notificationService.messages$
      .pipe(take(1))
      .subscribe(msg => {
        this.snackBar.open(msg.text, 'OK', {
          duration: 3000,
          panelClass: [`toast-${msg.type}`]
        });
      });
  }
}
