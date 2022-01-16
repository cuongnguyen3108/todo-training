import {createContext, Dispatch, FC, useReducer} from "react";
import {TodoData} from "./TodoData";
import {TodoAppAction, TodoReducer} from "./TodoApp";

type TodoContextData = {
    todos: TodoData[],
    dispatch: Dispatch<TodoAppAction<unknown>>
}

const TodoContext = createContext<TodoContextData>({
    todos: [],
    dispatch: () => {}
});

export default TodoContext;

export const TodoProvider: FC = ({ children }) => {

    const [todos, dispatch] = useReducer(TodoReducer, [])

    return (
        <TodoContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodoContext.Provider>
    )
}