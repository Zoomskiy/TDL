import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskAC = {
    type: 'REMOVE-TASK'
    id: string
    tdlID: string
}

export type AddTaskAC = {
    type: 'ADD-TASK'
    taskTitle: string
    TDLID: string
}
export type ChangeTaskStatusAC = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    taskStatus: boolean
    TDLID: string
}

type ActionsType = RemoveTaskAC | AddTaskAC | ChangeTaskStatusAC

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
            if(selectedTask){
                selectedTask.isDone = action.taskStatus
            }
            return copyTDL
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (id: string, tdlID: string): RemoveTaskAC => {
    return {type: 'REMOVE-TASK', id, tdlID}
}
export const addTaskAC = (taskTitle: string, TDLID: string): AddTaskAC => {
    return {type: 'ADD-TASK', taskTitle, TDLID}
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, TDLID: string): ChangeTaskStatusAC => {
    return  {type: "CHANGE-TASK-STATUS", taskStatus, taskId, TDLID}
}
