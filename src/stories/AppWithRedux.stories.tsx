import React from "react";
import {Meta, Story} from "@storybook/react";
import AppWithRedux from "../AppWithRedux";


export default {
    title: "Todolist/AppWithRedux",
    component: AppWithRedux,

} as Meta
const Template: Story = () => <AppWithRedux/>
export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args = {}
