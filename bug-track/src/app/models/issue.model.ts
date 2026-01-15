export type IssueType = 'Bug' | 'Feature' | 'Documentation';
export type IssuePriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  tags: string[];
  assignee: string | null;
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
  history: IssueHistoryRecord[];
}

export interface IssueHistoryRecord {
  date: string;
  user: string;
  field: string;
  oldValue: string;
  newValue: string;
  comment?: string;
}

export interface IssueFilter {
  search: string;
  type: IssueType | 'All';
  priority: IssuePriority | 'All';
  assignee: string | 'All';
  status: IssueStatus | 'All';
  tags: string[];
}
