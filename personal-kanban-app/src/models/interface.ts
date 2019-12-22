export interface ITaskContainerItem {
  tasks: ITaskItem[];
}

export interface ITaskItem {
  id: number;
  stringId: string;
  status: string;
  dueDate: Date;
  title: string;
  description: string;
  completeDate?: Date;
}
