import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-a-p-i";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolist()
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("300 $, welcome to the club")
            .then((response) => {
                setState(response.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4cb3c7f4-15ec-4fb7-ae6e-041992dfa04b';
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd8ae6252-d329-4433-a626-54d1ab225d56'
        todolistsAPI.updateTodolist(todolistId, "Some brand brand title")
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d8ae6252-d329-4433-a626-54d1ab225d56"
        todolistsAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [titleTask, setTitleTask] = useState<string>("")

    const addTaskCall = () => {
        todolistsAPI.createTask(todolistId, titleTask)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"title task"} value={titleTask} onChange={(e) => setTitleTask(e.currentTarget.value)}/>
        <input placeholder={"todolistID"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={addTaskCall} >add task</button>
    </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [titleTask, setTitleTask] = useState<string>("")

    const updateTaskCall = () => {
        todolistsAPI.updateTask(todolistId, taskId, titleTask)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"TodolistId"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={"TaskId"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder={"Task Title"} value={titleTask} onChange={(e) => setTitleTask(e.currentTarget.value)}/>
        <button onClick={updateTaskCall}>update task</button>
    </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

const deleteTaskCall = () => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            setState(response.data)
        })
}
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}  onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTaskCall}>delete task</button>
        </div>
    </div>
}
