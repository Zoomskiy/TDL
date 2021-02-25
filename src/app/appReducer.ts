

const initialState: InitialStateType = {
    status: "idle",
    error: null
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return  {...state, error: action.error}
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
export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusAC = ReturnType<typeof setAppStatusAC>;
type ActionsType =  SetErrorActionType
    | SetStatusAC

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}