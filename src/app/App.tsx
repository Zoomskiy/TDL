import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppTC, RequestStatusType} from "./appReducer";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";
import { logoutTC } from '../features/Login/auth-reducer'

type PropsType = {
    demo?: boolean
}

function App ({demo = false}: PropsType) {
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])
    if(!isInitialized){
        return <div
            style={{position: "fixed", width: "100%", top: "30%" , textAlign: "center"}}>
            <CircularProgress/>
        </div>
    }



    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <ErrorSnackbar/>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={"/"} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>

                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
