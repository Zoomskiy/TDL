import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function AddItemForm (props: AddItemFormPropsType) {
        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>(null)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setError(null);
            setTitle(e.currentTarget.value)
        }
        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(error !== null) {
                setError(null)
            }
            if(e.charCode === 13) {
                addItem();
            }
        }
        const addItem = () => {
            let newTitle = title.trim();
            if(newTitle !== "") {
                props.addItem(newTitle);
                setTitle("");
            } else {
                setError("Title is required");
            }
        }

        return (
            <div>
                <TextField value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? "error" : ""}
                           error={!!error}
                           helperText={error}
                           label={"Enter text"}
                />
                <IconButton><AddBox color={"primary"} onClick={addItem}></AddBox></IconButton>
            </div>
        )
    }
)