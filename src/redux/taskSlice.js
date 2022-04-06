import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getTasks } from "../LocalStorage/taskStorage";

const _initialState = getTasks();

const taskSlice = createSlice({
  name: "tasks",
  initialState: _initialState,
  reducers: {
    addTaskToStore: (state, action) => {
      state.push(action.payload.task);
    },
    deleteTaskByIdStore: (state, action) => {
      return state.filter((task) => {
        return task.id !== action.payload.id;
      });
    },
    updateTaskStore: (state, action) => {
      let index = state.findIndex((task) => {
        return task.id === action.payload.task.id;
      });
      state[index] = action.payload.task;
    },
    deleteAllTasksStore: (state, action) => {
      const tasks = [];
      return tasks;
    },
  },
});

export const {
  addTaskToStore,
  deleteTaskByIdStore,
  updateTaskStore,
  deleteAllTasksStore,
} = taskSlice.actions;
export default taskSlice.reducer;
