import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getImageForTask } from './unsplashAPI';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  isLoading: false,
  error: null,
};

export const addTaskWithImage = createAsyncThunk(
  'todo/addTaskWithImage',
  async ({ text, priority }, { rejectWithValue }) => {
    try {
      const imageUrl = await getImageForTask(text);
      return { text, imageUrl, priority };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    prioritizeTask: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.priority = priority;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    loadTasks: (state) => {
      state.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskWithImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTaskWithImage.fulfilled, (state, action) => {
        state.isLoading = false;
        const newTask = { id: Date.now(), ...action.payload };
        state.tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(addTaskWithImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteTask, prioritizeTask, loadTasks } = todoSlice.actions;
export default todoSlice.reducer;