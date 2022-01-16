import {FC, useContext, useState} from "react";
import TodoContext from "../TodoContext";
import {ACTION_TYPES} from "../TodoApp";

const AddTodo: FC = () => {

    const [todoName, setTodoName] = useState('')
    const { dispatch } = useContext(TodoContext)
    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            dispatch({
                type: ACTION_TYPES.ADD_TODO,
                data: todoName
            })
            setTodoName('')
        }}>
            <input name="todoNAme" value={todoName} onChange={(event) => {
                setTodoName(event.target.value)
            }} type="text"/>
            <button>+</button>
        </form>
    )
}

export default AddTodo
