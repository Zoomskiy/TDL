import React from "react";
import {Meta, Story} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: "Todolist/AppWithRedux",
    component: ReduxStoreProviderDecorator,

} as Meta
const Template: Story = () => <ReduxStoreProviderDecorator/>
export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args = {}
