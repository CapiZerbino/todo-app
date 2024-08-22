import { createAsyncThunk } from '@reduxjs/toolkit';

import { supabase } from '../../common/services';
import { Task, TaskUpdateForm } from './types';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const { data, error, status } = await supabase.from('Task').select('*').eq('is_done', false);

    if (error || status !== 200) {
      return rejectWithValue(error);
    }
    return data as Task[];
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createTask = createAsyncThunk<Task, Partial<Task>>('tasks/createTask', async (payload, { rejectWithValue }) => {
  try {
    const { data, error, status } = await supabase.from('Task').insert({
      description: payload.description,
      is_done: payload.is_done,
      title: payload.title,
    });

    if (error || status !== 201) {
      return rejectWithValue(error);
    }

    if (!data) {
      return rejectWithValue('Failed to create task');
    }

    return data as Task;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const markAsDoneTask = createAsyncThunk<Task, string>('tasks/markAsDoneTask', async (taskId, { rejectWithValue }) => {
  try {
    const { data, error, status } = await supabase.from('Task').update({ is_done: true }).eq('id', taskId);

    if (error || status !== 200) {
      return rejectWithValue(error);
    }

    if (!data) {
      return rejectWithValue('Failed to mark as done task');
    }

    return data as Task;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteTask = createAsyncThunk<string, string>('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    const { data, error, status } = await supabase.from('Task').delete().eq('id', taskId);

    if (error || status !== 200) {
      return rejectWithValue(error);
    }

    if (!data) {
      return rejectWithValue('Failed to delete task');
    }

    return taskId;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateTask = createAsyncThunk<Task, Task>('tasks/updateTask', async (task, { rejectWithValue }) => {
  try {
    const { data, error, status } = await supabase.from('Task').update(task).eq('id', task.id);

    if (error || status !== 200) {
      return rejectWithValue(error);
    }

    if (!data) {
      return rejectWithValue('Failed to update task');
    }

    return data as Task;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchTaskWithId = createAsyncThunk<Task, string>('tasks/fetchTaskWithId', async (taskId, { rejectWithValue }) => {
  try {
    const { data, error, status } = await supabase.from('Task').select('*').eq('id', taskId);

    if (error || status !== 200) {
      return rejectWithValue(error);
    }

    if (!data || data.length === 0) {
      return rejectWithValue('Task not found');
    }

    return data[0] as Task;
  } catch (error) {
    return rejectWithValue(error);
  }
});
