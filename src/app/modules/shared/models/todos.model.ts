export interface UpdateTodoModel {
  listId?: string;
  title?: string;
  description?: string;
  dueDateTime?: number;
  completionStatus?: boolean;
  attachment?: Array<string>;
}
