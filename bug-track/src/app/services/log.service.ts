import { Injectable } from '@angular/core';
import { Issue, IssueHistoryRecord } from '../models/issue.model';

@Injectable({ providedIn: 'root' })
export class LogService {
  addHistory(
    issue: Issue,
    user: string,
    field: string,
    oldValue: string,
    newValue: string,
    comment?: string
  ) {
    const record: IssueHistoryRecord = {
      date: new Date().toISOString(),
      user,
      field,
      oldValue,
      newValue,
      comment
    };
    issue.history = [...issue.history, record];
  }
}
