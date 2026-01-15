import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Issue } from '../models/issue.model';
import { LogService } from './log.service';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private issues$ = new BehaviorSubject<Issue[]>([]);
  private id = 1;

  constructor(private log: LogService) {}

  getIssues() {
    return this.issues$.asObservable();
  }

  addIssue(issue: Omit<Issue, 'id'>) {
    const newIssue = { ...issue, id: this.id++ };
    this.issues$.next([...this.issues$.value, newIssue]);
    this.log.log(`Issue created: ${newIssue.title}`);
  }

  updateIssue(issue: Issue) {
    this.issues$.next(
      this.issues$.value.map(i => i.id === issue.id ? issue : i)
    );
    this.log.log(`Issue updated: ${issue.title}`);
  }
}
