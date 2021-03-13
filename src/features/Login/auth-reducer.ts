import {Dispatch} from "react";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusAC} from "../../app/appReducer";
import {authAPI, LoginParamType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {updateTaskAC} from "../TodolistsList/tasks-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state
    }
}

// actions
 export const setIsLoggedInAC = (value: boolean) =>
     ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (data: LoginParamType) => (dispatch: Dispatch<ActionsType | SetAppStatusAC | SetAppErrorActionType> ) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusAC | SetAppErrorActionType> ) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}


// types
 type InitialStateType = {
     isLoggedIn: boolean
 }
type ActionsType = ReturnType<typeof setIsLoggedInAC>


type ThunkDispatch = Dispatch<ActionsType | SetAppStatusAC | SetAppErrorActionType>