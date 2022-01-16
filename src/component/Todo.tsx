import {FC, useContext, useState} from "react";
import {TodoData} from "../TodoData";
import TodoContext from "../TodoContext";
import {ACTION_TYPES} from "../TodoApp";

type TodoProps = {
    todo: TodoData
}

const Todo: FC<TodoProps> = ({todo}) => {

    const [newNameInput, setNameInput] = useState(todo.name)
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const buttonLabel = editingMode ? 'done' : 'edit'
    const { dispatch } = useContext(TodoContext)

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                !editingMode && dispatch({
                    type: ACTION_TYPES.UPDATE_TODO,
                    data: {
                        id: todo.id,
                        name: newNameInput,
                        done: todo.done
                    }
                })
            }}
        >
            <input type="checkbox"
                   checked={todo.done}
                   onChange={(event) => {
                       dispatch({
                           type: ACTION_TYPES.UPDATE_TODO,
                           data: {
                               id: todo.id,
                               name: newNameInput,
                               done: event.target.checked
                           }
                       })
                   }}
            />
            <input
                type="text"
                disabled={!editingMode}
                value={newNameInput}
                onChange={(event) => {
                    setNameInput(event.target.value)
                }}/>
            <button
                onClick={() => {
                    setEditingMode(prevState => !prevState)
                }}>
                {buttonLabel}
            </button>
        </form>
    );
}

export default Todo
