
 import React from "react";
 import {Story, Meta} from "@storybook/react";

 import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
 import {action} from "@storybook/addon-actions";

 export default {
     title: "Todolists/AddItemForm",
     component: AddItemForm,
     argTypes: {
         onClick: {
             description: "Buttons inside form clicked"
         }
     },
 } as Meta

 const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>

 export const AddItemFormExample = Template.bind({})
 AddItemFormExample.args = {
     addItem: action("Buttons inside form clicked")
 }


