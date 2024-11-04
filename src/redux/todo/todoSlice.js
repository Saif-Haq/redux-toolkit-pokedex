import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to simulate adding a to-do
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (text) => {
    // Simulating a network request with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: Date.now(), text, completed: false }; // Return the new to-do
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // Add the new to-do to the array
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
