export interface TodoModel {
  _id_: string;
  listId: string;
  title: string;
  description: string;
  createDateTime: number;
  dueDateTime?: number;
  completionDateTime?: number;
  completionStatus: boolean;
  attachment?: Array<string>;
}
