import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskType} from "../Todolist";

export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    id: string
    tdlID: string
}

export type AddTaskACType = {
    type: 'ADD-TASK'
    taskTitle: string
    TDLID: string
}
export type ChangeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    taskStatus: boolean
    TDLID: string
}
export type ChangeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    taskTitle: string
    TDLID: string
}

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistActionType |RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.tdlID];
            const newTasks = tasks.filter(t => t.id !== action.id);
            stateCopy[action.tdlID] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }
            const tasks = stateCopy[action.TDLID];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.TDLID] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.TDLID]
            state[action.TDLID] = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.taskStatus}: t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.TDLID]
            state[action.TDLID] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.taskTitle}: t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
           delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, tdlID: string): RemoveTaskACType => {
    return {type: 'REMOVE-TASK', id, tdlID}
}
export const addTaskAC = (taskTitle: string, TDLID: string): AddTaskACType => {
    return {type: 'ADD-TASK', taskTitle, TDLID}
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, TDLID: string): ChangeTaskStatusACType => {
    return {type: "CHANGE-TASK-STATUS", taskStatus, taskId, TDLID}
}
export const changeTaskTitleAC = (TDLID: string, taskId: string, taskTitle: string): ChangeTaskTitleACType => {
    return {type: "CHANGE-TASK-TITLE", taskId, TDLID, taskTitle}
}
