import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _messages$ = new Subject<NotificationMessage>();
  messages$ = this._messages$.asObservable();

  showSuccess(text: string) {
    this._messages$.next({ type: 'success', text });
  }

  showError(text: string) {
    this._messages$.next({ type: 'error', text });
  }

  showInfo(text: string) {
    this._messages$.next({ type: 'info', text });
  }
}
