import {setAppErrorAC, SetAppErrorActionType, SetAppStatusAC, setAppStatusAC} from "../app/appReducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "react";

export const handleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusAC>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}
export const handleServerNetworkError =  (error: {message: string}, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusAC>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some Error occurred"))
    dispatch(setAppStatusAC("failed"))
}
