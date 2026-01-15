import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private message$ = new Subject<{ text: string; type: 'success' | 'error' }>();

  messages$ = this.message$.asObservable();

  success(text: string) {
    this.message$.next({ text, type: 'success' });
  }

  error(text: string) {
    this.message$.next({ text, type: 'error' });
  }
}
