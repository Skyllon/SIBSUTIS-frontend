import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Issue, IssueFilter } from '../models/issue.model';
import { LogService } from './log.service';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private _issues$ = new BehaviorSubject<Issue[]>([]);
  issues$ = this._issues$.asObservable();

  private _filter$ = new BehaviorSubject<IssueFilter>({
    search: '',
    type: 'All',
    priority: 'All',
    assignee: 'All',
    status: 'All',
    tags: []
  });
  filter$ = this._filter$.asObservable();

  filteredIssues$ = combineLatest([this.issues$, this.filter$]).pipe(
    map(([issues, filter]) => {
      return issues.filter(issue => {
        const matchesSearch =
          !filter.search ||
          issue.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          issue.description.toLowerCase().includes(filter.search.toLowerCase());

        const matchesType = filter.type === 'All' || issue.type === filter.type;
        const matchesPriority =
          filter.priority === 'All' || issue.priority === filter.priority;
        const matchesAssignee =
          filter.assignee === 'All' || issue.assignee === filter.assignee;
        const matchesStatus =
          filter.status === 'All' || issue.status === filter.status;
        const matchesTags =
          !filter.tags.length || filter.tags.every(t => issue.tags.includes(t));

        return (
          matchesSearch &&
          matchesType &&
          matchesPriority &&
          matchesAssignee &&
          matchesStatus &&
          matchesTags
        );
      });
    })
  );

  constructor(private log: LogService) {
    const now = new Date().toISOString();
    this._issues$.next([
      {
        id: 1,
        title: 'Ошибка авторизации',
        description: 'Пользователь не может войти с корректным паролем',
        type: 'Bug',
        priority: 'Critical',
        tags: ['auth', 'backend'],
        assignee: 'Иван',
        status: 'Open',
        createdAt: now,
        updatedAt: now,
        history: []
      }
    ]);
  }

  setFilter(filter: IssueFilter) {
    this._filter$.next(filter);
  }

  getIssueById(id: number): Issue | undefined {
    return this._issues$.value.find(i => i.id === id);
  }

  createIssue(issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'history'>) {
    const issues = this._issues$.value;
    const now = new Date().toISOString();
    const newIssue: Issue = {
      ...issue,
      id: issues.length ? Math.max(...issues.map(i => i.id)) + 1 : 1,
      createdAt: now,
      updatedAt: now,
      history: []
    };
    this._issues$.next([...issues, newIssue]);
  }

  updateIssue(updated: Issue, user: string) {
    const issues = this._issues$.value.map(issue => {
      if (issue.id !== updated.id) return issue;

      if (issue.status !== updated.status) {
        this.log.addHistory(
          updated,
          user,
          'status',
          issue.status,
          updated.status,
          'Изменение статуса'
        );
      }
      if (issue.assignee !== updated.assignee) {
        this.log.addHistory(
          updated,
          user,
          'assignee',
          issue.assignee ?? '',
          updated.assignee ?? '',
          'Изменение исполнителя'
        );
      }

      return { ...updated, updatedAt: new Date().toISOString() };
    });

    this._issues$.next(issues);
  }

  deleteIssue(id: number) {
    this._issues$.next(this._issues$.value.filter(i => i.id !== id));
  }
}
