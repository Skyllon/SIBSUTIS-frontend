import { TestBed } from '@angular/core/testing';
import { IssueService } from '../services/issue.service';
import { LogService } from '../services/log.service';

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueService, LogService]
    });
    service = TestBed.inject(IssueService);
  });

  it('should create issue', () => {
    service.createIssue({
      title: 'Test',
      description: 'Desc',
      type: 'Bug',
      priority: 'Medium',
      assignee: null,
      status: 'Open',
      tags: []
    });
    service.issues$.subscribe(issues => {
      expect(issues.length).toBeGreaterThan(0);
    });
  });
});
