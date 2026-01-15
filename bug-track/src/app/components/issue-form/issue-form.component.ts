import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import {
  Issue,
  IssuePriority,
  IssueStatus,
  IssueType
} from '../../models/issue.model';

@Component({
  selector: 'issue-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnChanges {
  @Input() issue: Issue | null = null;
  @Output() save = new EventEmitter<Issue>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  issueTypes: IssueType[] = ['Bug', 'Feature', 'Documentation'];
  priorities: IssuePriority[] = ['Critical', 'High', 'Medium', 'Low'];
  statuses: IssueStatus[] = ['Open', 'In Progress', 'Resolved', 'Closed'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['Bug' as IssueType, Validators.required],
      priority: ['Medium' as IssuePriority, Validators.required],
      assignee: [''],
      status: ['Open' as IssueStatus, Validators.required],
      tags: [[] as string[]],
      newTag: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['issue'] && this.issue) {
      this.form.patchValue({
        title: this.issue.title,
        description: this.issue.description,
        type: this.issue.type,
        priority: this.issue.priority,
        assignee: this.issue.assignee ?? '',
        status: this.issue.status,
        tags: this.issue.tags,
        newTag: ''
      });
    }
  }

  addTag(): void {
    const tag = (this.form.value.newTag as string | undefined)?.trim();
    if (!tag) return;
    const tags = (this.form.value.tags as string[]) ?? [];
    if (!tags.includes(tag)) {
      this.form.patchValue({ tags: [...tags, tag], newTag: '' });
    }
  }

  removeTag(tag: string): void {
    const tags = (this.form.value.tags as string[]) ?? [];
    this.form.patchValue({ tags: tags.filter(t => t !== tag) });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const result: Issue = {
      id: this.issue?.id ?? 0,
      title: value.title!,
      description: value.description!,
      type: value.type!,
      priority: value.priority!,
      assignee: value.assignee || null,
      status: value.status!,
      tags: (value.tags as string[]) ?? [],
      createdAt: this.issue?.createdAt ?? '',
      updatedAt: this.issue?.updatedAt ?? '',
      history: this.issue?.history ?? []
    };

    this.save.emit(result);
  }
}
