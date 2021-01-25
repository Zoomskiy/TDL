import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import { Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.id)
    }, [])
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }


    return <div>
        <h3>
            <EditableSpan value={props.title} getNewTitle={changeTodoListTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete></Delete>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} getNewTitle={changeTaskTitle}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete>x</Delete></IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <ButtonGroup size={"small"} color={"primary"}>
                <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


