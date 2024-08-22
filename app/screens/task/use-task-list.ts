import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../common/store';
import { Task } from '../../features/tasks';
import { markAsDoneTask, fetchTasks } from '../../features/tasks/tasks-thunks';

export function useTaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const [refeshing, setRefreshing] = useState(false);
  const { status, tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleMarkAsDone = useCallback(
    (task: Task) => {
      dispatch(markAsDoneTask(task.id)).then(() => {
        dispatch(fetchTasks());
      });
    },
    [dispatch],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchTasks()).finally(() => {
      setRefreshing(false);
    });
  }, [dispatch]);

  return { handleMarkAsDone, handleRefresh, refeshing, status, tasks };
}
