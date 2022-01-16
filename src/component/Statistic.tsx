import {FC, useContext} from "react";
import TodoContext from "../TodoContext";

const Statistic: FC = () => {

    const { todos } = useContext(TodoContext)

    return (
        <h1> Todo ({todos.filter(todo => todo.done).length}/{todos.length})</h1>
    );
}

export default Statistic
