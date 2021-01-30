import React from "react";
import {Story, Meta} from "@storybook/react";

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";

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
    task: {id: "1", isDone: true, title:"JS"},
    todolistId: "todolistId1"
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: "1", isDone: false, title: "JS"},
    todolistId: "todolistId1"
}
