import {FC, useContext} from "react";
import Todo from "./Todo";
import TodoContext from "../TodoContext";

const TodoList: FC = () => {

    const {todos} = useContext(TodoContext)

    return (
        <ul>
            {
                todos.map((todo) =>
                    <li key={todo.id}>
                        <Todo todo={todo}/>
                    </li>
                )
            }
        </ul>
    );
}

export default TodoList
