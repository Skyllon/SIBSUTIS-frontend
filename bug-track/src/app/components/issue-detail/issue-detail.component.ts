import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { IssueService } from '../../services/issue.service';
import { NotificationService } from '../../services/notification.service';
import { Issue } from '../../models/issue.model';
import { IssueFormComponent } from '../issue-form/issue-form.component';

@Component({
  selector: 'issue-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    IssueFormComponent
  ],
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  issue: Issue | null = null;
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === 0) {
      this.isNew = true;
      this.issue = null;
    } else {
      const found = this.issueService.getIssueById(id);
      if (!found) {
        this.notification.showError('Задача не найдена');
        this.router.navigate(['/']);
        return;
      }
      this.issue = found;
    }
  }

  onSave(issueFromForm: Issue): void {
    if (this.isNew) {
      this.issueService.createIssue({
        title: issueFromForm.title,
        description: issueFromForm.description,
        type: issueFromForm.type,
        priority: issueFromForm.priority,
        assignee: issueFromForm.assignee,
        status: issueFromForm.status,
        tags: issueFromForm.tags
      });
      this.notification.showSuccess('Задача создана');
    } else if (this.issue) {
      this.issueService.updateIssue(issueFromForm, 'Текущий пользователь');
      this.notification.showSuccess('Задача обновлена');
    }
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
