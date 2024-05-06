import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
}



export const taskReducer = createSlice({
  name: 'tasks',
  initialState: {
    tasks: ["Task 1", "Task 2", "Task 3"],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      //code
    },
    deleteTask: (state, action) => {
      //code
    },
  },
  extraReducers: (builder) => {

  }
});

export const { setTasks, addTask, deleteTask } = taskReducer.actions;

export default taskReducer.reducer;