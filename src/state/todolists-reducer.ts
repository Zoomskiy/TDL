import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType


export const todolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let copyState = state.filter(t => t.id != action.id)
            return copyState
        }
        case "ADD-TODOLIST": {
            return [
                ...state,
                {id: v1(), title: action.title, filter: "all"}]
        }
        case "CHANGE-TODOLIST-FILTER" : {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let TDLItem = state.find(a => a.id === action.id)
            if (TDLItem) {
                TDLItem.title = action.title
                return [...state]
            }
        }
        default:
          throw new Error("I don't understand this type")
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAc = (title: string) : AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodolistTitleAC = (id: string, title: string) : ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) : ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}