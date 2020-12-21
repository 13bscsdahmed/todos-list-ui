export interface AddTodoDialogDataModel {
  listId: string;
}


export interface CreateTodoModel {
  listId: string;
  title: string;
  description?: string;
  dueDateTime?: number;
}
