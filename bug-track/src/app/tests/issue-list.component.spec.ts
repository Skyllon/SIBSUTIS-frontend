import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueListComponent } from '../components/issue-list/issue-list.component';
import { IssueService } from '../services/issue.service';
import { NotificationService } from '../services/notification.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueListComponent, RouterTestingModule],
      providers: [IssueService, NotificationService]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
