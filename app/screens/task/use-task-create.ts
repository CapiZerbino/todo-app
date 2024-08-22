import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { AppDispatch, RootState } from '../../common/store';
import { TaskCreateForm } from '../../features/tasks';
import { createTask, fetchTasks } from '../../features/tasks/tasks-thunks';
import { logger } from '../../utils';

// Define the schema for the form validation
const schema = yup.object().shape({
  description: yup.string().max(255, 'Max length is 255 characters'),
  title: yup.string().required('Title is required').max(80, 'Max length is 80 characters'),
});

export function useTaskCreate() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.tasks);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TaskCreateForm>({ criteriaMode: 'all', defaultValues: {}, mode: 'all', resolver: yupResolver(schema) });
  const getMessageError = (name: string) => {
    return _.get(errors, `${name}.message`);
  };

  const onSubmit = (data: TaskCreateForm) => {
    logger.log('data', data);
    dispatch(createTask(data)).then(() => {
      // Go back to the task list screen after adding
      dispatch(fetchTasks());
      navigation.goBack();
    });
  };
  return {
    control,
    getMessageError,
    handleSubmit,
    isValid,
    onSubmit,
    status,
  };
}
