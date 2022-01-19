import {useEffect, useMemo, useState} from "react";
import {TodoData} from "../TodoData";
import axios from 'axios';

type TodoSearchCondition = {
    userId?: number,
    completed?: boolean
}

const useTodos = (condition: TodoSearchCondition) => {
    const [isLoading, setIsLoading] = useState(false)
    const [todos, setTodos] = useState<TodoData[]>([])
    const memoCondition = useMemo(() => {
        return {
            userId: condition.userId,
            completed: condition.completed
        }
    }, [condition.userId, condition.completed])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/todos/`, {
            params: memoCondition
        }).then(({data}) => {
            const firstTen = data.splice(0, 10)
            const loadedTodos = (firstTen as any[]).map(todoFromAPI => {
                return {
                    id: todoFromAPI.id,
                    name: todoFromAPI.title,
                    done: todoFromAPI.completed
                }
            })

            setTodos(loadedTodos)

        }).finally(() => {
            setIsLoading(false)
        })

    },[memoCondition])

    return [todos, isLoading]
}

export default useTodos
