import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Action =
  | {
      type: "ADD_TODO";
      payload: string;
    }
  | {
      type: "TOGGLE_TODO";
      payload: string;
    }
  | {
      type: "REMOVE_TODO";
      payload: string;
    }
  | {
      type: "LOAD_TODOS";
      payload: Todo[];
    };

const initialState: Todo[] = [];

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: crypto.randomUUID(), text: action.payload, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "LOAD_TODOS":
      return action.payload;
    default:
      return state;
  }
};

export const TodoContext = createContext<{
  state: Todo[];
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, [], () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const loadTodos = useCallback(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch({ type: "LOAD_TODOS", payload: JSON.parse(storedTodos) });
    }
  }, []);

  const saveTodos = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    saveTodos();
  }, [state, saveTodos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
