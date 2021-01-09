import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyTasks = {...state}
            const tdl = state[action.tdlID]
            const filteredTasks = tdl.filter(task => task.id !== action.id)
            copyTasks[action.tdlID] = filteredTasks
            return copyTasks
        }
        case "ADD-TASK": {
            const copyTDL = {...state}
            let tdl = [...state[action.TDLID], {id: v1(), title: action.taskTitle, isDone: false}]
            copyTDL[action.TDLID] = tdl
            return copyTDL
        }
        case "CHANGE-TASK-STATUS": {
            const copyTDL = {...state}
            const selectedTask = copyTDL[action.TDLID].find(task => task.id === action.taskId)
            if (selectedTask) {
                selectedTask.isDone = action.taskStatus
            }
            return copyTDL
        }
        case "CHANGE-TASK-TITLE": {
            const copyTDL = {...state}
            const selectedTask = copyTDL[action.TDLID].find(task => task.id === action.taskId)
            if (selectedTask) {
                selectedTask.title = action.taskTitle
            }
            return copyTDL
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
           delete copyState[action.todolistId]
            return copyState
        }
        default:
            throw new Error("I don't understand this action type")
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
