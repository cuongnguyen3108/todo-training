import {Reducer} from "react";
import {TodoData} from "./TodoData";

export enum ACTION_TYPES {
    CLEAR_DONE = 'CLEAR_DONE',
    ADD_TODO = 'ADD_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    LOAD_TODO = 'LOAD_TODO'
}

export type TodoAppAction<ActionData> = {
    type: ACTION_TYPES,
    data?: ActionData
}

export const TodoReducer: Reducer<TodoData[], TodoAppAction<unknown>> = (prevState, action) => {
    console.log(action)
    switch (action.type) {
        case ACTION_TYPES.CLEAR_DONE:
            return prevState.filter(({done}) => !done)

        case ACTION_TYPES.ADD_TODO:
            return [...prevState, {id: new Date().getTime(), name: action.data as string, done: false}]
        case ACTION_TYPES.UPDATE_TODO:
            return prevState.map(todo => {
                const updatedTodo = action.data as TodoData
                if (todo.id === updatedTodo.id) {
                    return updatedTodo
                }
                return todo
            })
        case ACTION_TYPES.LOAD_TODO:
            return action.data as TodoData[]
        default:
            return prevState
    }
}
