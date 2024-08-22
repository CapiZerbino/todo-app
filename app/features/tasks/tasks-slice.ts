import { createSlice } from '@reduxjs/toolkit';

import { markAsDoneTask, createTask, deleteTask, fetchTasks, updateTask, fetchTaskWithId } from './tasks-thunks';
import { TaskState } from './types';

const initialState: TaskState = {
  error: null,
  loadingTaskId: null,
  status: 'idle',
  tasks: [],
};

export const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Complete task
      .addCase(markAsDoneTask.pending, (state, action) => {
        state.loadingTaskId = action.meta.arg.id;
      })
      .addCase(markAsDoneTask.fulfilled, (state, action) => {
        console.log('markAsDoneTask.fulfilled', action.payload);
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loadingTaskId = null; // Clear loading after success
      })
      .addCase(markAsDoneTask.rejected, (state, action) => {
        state.loadingTaskId = null; // Clear loading if failed
      })
      // Delete task
      .addCase(deleteTask.pending, (state, action) => {
        state.loadingTaskId = action.meta.arg.id; // Set loading for the specific task being deleted
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        state.loadingTaskId = null; // Clear loading after deletion
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loadingTaskId = null; // Clear loading if failed
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Fetch task with id
      .addCase(fetchTaskWithId.pending, (state, action) => {
        state.status = 'loading';
      });
  },
  initialState: initialState,
  name: 'tasks',
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
