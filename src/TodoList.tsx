import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const TodoList: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleRemoveTodo = (id: string) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo();
  };

  return (
    <div className="bg-base-100 p-8 rounded-xl h-full">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-semibold">Vite + React SIMPLE TODO LIST</h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <input
          className="input input-bordered w-full max-w-xs mr-2"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button
          className="btn btn-primary"
          onClick={handleAddTodo}
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="max-w-xl m-auto pt-8 flex flex-col gap-2">
        {state.length > 0 ? (
          state.map((todo) => (
            <>
              <li
                key={todo.id}
                className="flex justify-between bg-base-100 gap-2 p-2 items-center rounded"
              >
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      id="todo-checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="checkbox"
                    />
                    <span
                      className="label-text text-xl ml-4"
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.text}
                    </span>
                  </label>
                </div>

                <button
                  className="btn btn-square btn-error btn-outline btn-sm"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
              <div className="border-t border-base-300"></div>
            </>
          ))
        ) : (
          <p className="text-center">No todos yet</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
