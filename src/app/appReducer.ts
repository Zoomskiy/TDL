import {Dispatch} from "react";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";


const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}

        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setAppInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        value
    } as const
}

export const initializedAppTC = () => (dispatch: Dispatch<any>) => {
    authAPI.me()
        .then(responce => {
            if(responce.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            }else {

            }
            dispatch(setAppInitializedAC(true))

        })
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAC = ReturnType<typeof setAppStatusAC>;

type ActionsType = SetAppErrorActionType
    | SetAppStatusAC
    | ReturnType<typeof setAppInitializedAC>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    isInitialized: boolean
}