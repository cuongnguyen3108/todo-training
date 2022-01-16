import React, {useContext} from "react";
import TodoContext from "../TodoContext";
import {ACTION_TYPES} from "../TodoApp";

const ClearDoneButton = () => {
    const { todos, dispatch } = useContext(TodoContext)

    const hasDoneInList = todos.filter(({ done }) => done).length
    return (
        <button
            disabled={!hasDoneInList}
            onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_DONE })}>Clear</button>
    )
}

export default ClearDoneButton;
