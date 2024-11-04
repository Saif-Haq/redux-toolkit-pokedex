import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import todoReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    todos: todoReducer,
  },
});
