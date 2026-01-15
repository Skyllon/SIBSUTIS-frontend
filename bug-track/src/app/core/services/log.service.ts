import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogService {
  log(action: string) {
    console.log(`[LOG]: ${action} at ${new Date().toISOString()}`);
  }
}
