export interface Task {
  id: string;
  title: string;
  description: string;
  is_done: boolean;
}
export interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loadingTaskId: string | null;
}

export type TaskCreateForm = {
  title: string;
  description?: string;
};

export type TaskUpdateForm = {
  title: string;
  description?: string;
};
