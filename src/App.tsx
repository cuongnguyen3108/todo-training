import React, {FC, useContext, useState} from 'react';
import AddTodo from './component/AddTodo';
import Statistic from './component/Statistic';
import TodoList from './component/TodoList';
import ClearDoneButton from "./component/ClearDoneButton";
import TodoContext from "./TodoContext";
import {ACTION_TYPES} from "./TodoApp";
import axios from "axios";

const LoadTodo: FC = () => {

    const {dispatch} = useContext(TodoContext)
    const [isLoading, setIsLoading] = useState(false)


    return (
        <button
            disabled={isLoading}
            onClick={event => {
                setIsLoading(true)
                axios.get('https://jsonplaceholder.typicode.com/todos/').then(({data}) => {
                    const firstTen = data.splice(0, 10)
                    const loadedTodos = (firstTen as any[]).map(todoFromAPI => {
                        return {
                            id: todoFromAPI.id,
                            name: todoFromAPI.title,
                            done: todoFromAPI.completed

                        }
                    })
                    dispatch({
                        type: ACTION_TYPES.LOAD_TODO,
                        data: loadedTodos
                    })
                }).finally(() => {
                    setIsLoading(false)
                })
            }}>
            {isLoading ? '...' : 'Load'}
        </button>
    )
}

const App: FC = () => {
    return (
        <>
            <Statistic/>
            <LoadTodo/>
            <TodoList/>
            <ClearDoneButton/>
            <AddTodo/>
        </>
    );
}

export default App;
