export interface TodosListModel {
  id: string;
  title: string;
  list: ListModel;
}

export interface ListModel {
  title: string;
  description: string;
  createDateTime: number;
  dueDateTime: number;
  completionDateTime: number;
  completionStatus: string;
  attachment: Array<string>;
}
