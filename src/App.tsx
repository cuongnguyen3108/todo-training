import React, {FC, useContext, useEffect, useState} from 'react';
import AddTodo from './component/AddTodo';
import Statistic from './component/Statistic';
import TodoList from './component/TodoList';
import ClearDoneButton from "./component/ClearDoneButton";
import TodoContext from "./TodoContext";
import {ACTION_TYPES} from "./TodoApp";
import useTodos from "./hooks/useTodos";

const App: FC = () => {

    const {dispatch} = useContext(TodoContext)
    const [doneStatus, setDoneStatus] = useState(false)
    const [todos, isLoading] = useTodos({completed: doneStatus, userId: 1})

    const todoListOpacity = isLoading ? 0.4 : 1

    useEffect(() => {
        !isLoading && dispatch({
            type: ACTION_TYPES.LOAD_TODO,
            data: todos
        })
    }, [dispatch, todos, isLoading])

    return (
        <>
            <Statistic/>
            <label>
                <input
                    type='checkbox'
                    onChange={event => {
                        setDoneStatus(event.target.checked)
                    }}
                    disabled={isLoading as boolean}
                />
                Filter with done
            </label>
            <div style={{
                opacity: todoListOpacity,
                transition: "ease-in",
                transitionDuration: '300ms',
                transitionProperty: "opacity"
            }}>
                <TodoList/>
            </div>
            <ClearDoneButton/>
            <AddTodo/>
        </>
    );
}

export default App;
