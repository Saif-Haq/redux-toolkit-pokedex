import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync, toggleTodo, deleteTodo } from "../redux/todo/todoSlice";

const Todo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { items: todos, status, error } = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodoAsync(text)); // Dispatch the async thunk
      setText("");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new to-do"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {status === "loading" && <p>Adding todo...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <span onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
