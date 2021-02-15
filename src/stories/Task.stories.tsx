import React from "react";
import {Meta, Story} from "@storybook/react";

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-a-p-i";

export default {
    title: "Todolists/Task",
    component: Task,
} as Meta

const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changes inside Task")
const removeTaskCallback = action("Remove Buttons inside Task clicked")

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}
export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: "1", status: TaskStatuses.Completed, title:"JS", addedDate: "", deadline: "", description: "", order:1, priority: TaskPriorities.Hi, startDate:"", todoListId:"1"},
    todolistId: "todolistId1"
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: "2", status: TaskStatuses.New, title:"react", addedDate: "", deadline: "", description: "", order:1, priority: TaskPriorities.Hi, startDate:"", todoListId:"1"},
    todolistId: "todolistId1"
}
