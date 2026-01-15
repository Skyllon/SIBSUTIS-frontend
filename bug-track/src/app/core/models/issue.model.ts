export type IssueType = 'Bug' | 'Feature' | 'Documentation';
export type Priority  = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Comment {
  author: string;
  message: string;
  date: Date;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  priority: Priority;
  assignee: string;
  tags: string[];
  status: 'Open' | 'In Progress' | 'Done';
  comments: Comment[];
}
