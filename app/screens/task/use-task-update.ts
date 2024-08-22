import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { AppDispatch, RootState } from '../../common/store';
import { Task, TaskUpdateForm } from '../../features/tasks';
import { deleteTask, fetchTasks, updateTask } from '../../features/tasks/tasks-thunks';

// Define the schema for the form validation
const schema = yup.object().shape({
  description: yup.string().max(255, 'Max length is 255 characters'),
  title: yup.string().required('Title is required').max(80, 'Max length is 80 characters'),
});

export function useTaskUpdate(task: Task) {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.tasks);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TaskUpdateForm>({
    criteriaMode: 'all',
    defaultValues: {
      description: task.description,
      title: task.title,
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const getMessageError = (name: string) => {
    return _.get(errors, `${name}.message`);
  };

  const onUpdateTask = (data: TaskUpdateForm) => {
    dispatch(
      updateTask({
        description: data.description,
        id: task.id,
        title: data.title,
      } as Task),
    ).then(() => {
      // Go back to the task list screen after updating
      dispatch(fetchTasks());
      navigation.goBack();
    });
  };

  const onDeleteTask = () => {
    dispatch(deleteTask(task.id)).then(() => {
      // Go back to the task list screen after deleting
      dispatch(fetchTasks());
      navigation.goBack();
    });
  };
  return {
    control,
    getMessageError,
    handleSubmit,
    isValid,
    onDeleteTask,
    onUpdateTask,
    status,
  };
}
