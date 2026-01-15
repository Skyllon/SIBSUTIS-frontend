import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { IssueService } from '../../services/issue.service';
import { NotificationService } from '../../services/notification.service';
import {
  Issue,
  IssuePriority,
  IssueStatus,
  IssueType
} from '../../models/issue.model';

@Component({
  selector: 'issue-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'title', 'type', 'priority', 'assignee', 'status', 'actions'];
  dataSource = new MatTableDataSource<Issue>([]);
  isLoading = true;

  filterForm!: FormGroup;

  issueTypes: (IssueType | 'All')[] = ['All', 'Bug', 'Feature', 'Documentation'];
  priorities: (IssuePriority | 'All')[] = ['All', 'Critical', 'High', 'Medium', 'Low'];
  statuses: (IssueStatus | 'All')[] = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

  private subscription?: Subscription;

  constructor(
    private issueService: IssueService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.filterForm = this.fb.group({
      search: [''],
      type: ['All' as IssueType | 'All'],
      priority: ['All' as IssuePriority | 'All'],
      assignee: ['All'],
      status: ['All' as IssueStatus | 'All'],
      tags: [[] as string[]]
    });

    this.subscription = this.issueService.filteredIssues$.subscribe(issues => {
      this.dataSource.data = issues;
      this.isLoading = false;
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.issueService.setFilter(value as any);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addIssue(): void {
    this.router.navigate(['/issue', 0]);
  }

  openIssue(issue: Issue): void {
    this.router.navigate(['/issue', issue.id]);
  }

  deleteIssue(issue: Issue): void {
    this.issueService.deleteIssue(issue.id);
    this.notification.showSuccess('Задача удалена');
  }
}
