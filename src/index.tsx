import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {TodoProvider} from "./TodoContext";

type Task = () => void;
type TaskMaker = (task: Task, ...parameters: any[]) => Task;

const taskComposer = (task: Task, makers: [TaskMaker, any[]][]) => {
    let outputTask: Task = task

    makers.forEach(([maker, params]) => {
        outputTask = maker(outputTask, ...params)
    })

    return outputTask;
}

const execute: TaskMaker = (task: Task, n = 1) => {
    return () => {
        for (let index = 0; index < n; index++) {
            task()
        }
    }
}

const delay: TaskMaker = (task: Task, ms: number) => {
    return () => {
        setTimeout(() => {
            task()
        }, ms)
    }
}

type ErrorHandler = (error: any) => void

const handleError: TaskMaker = (task: Task, retry = 1, handler: ErrorHandler = () => {}) => {
    return () => {

        let tries = 1;

        while (tries <= retry) {
            try {
                return task()
            } catch (error) {
                handler(error)
                tries++;
            }
        }

        ///
        throw new Error('Max try reached')
    }
}


const task: Task = () => {
    console.log('hello world')
}

// const output: Task = delay(handleError(delay(execute(handleError(task, 2), 3), 2000), 3), 1000)
// output()
const output = taskComposer(task, [
    [delay, [1000]],
    [handleError, [3]],
    [delay, [2000]],
    [execute, [3]],
    [handleError, [2]]
])

output()

ReactDOM.render(
    <React.StrictMode>
        <TodoProvider>
            <App/>
        </TodoProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
