import {TasksStateType} from "../App";

export type RemoveTaskAC = {
    type: 'REMOVE-TASK'
    id: string
    tdlID: string
}

export type SomeActionCreatorActionType2 = {
    type: ''
    id: string
}

type ActionsType = RemoveTaskAC | SomeActionCreatorActionType2

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
           const copyTasks = {...state}
           const tdl = state[action.tdlID]
           const filteredTasks = tdl.filter(task => task.id !== action.id)
           copyTasks[action.tdlID] = filteredTasks
           return copyTasks
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (id: string, tdlID: string): RemoveTaskAC => {
    return {type: 'REMOVE-TASK', id, tdlID}
}
export const SomeAC2 = (id: string): SomeActionCreatorActionType2 => {
    return {type: '', id: id}
}
