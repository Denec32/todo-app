import { useState } from "react";
import { Task } from "../../types/Task";

type TaskFormProps = {
    onClickAdd : (task : Task) => void
}

function TaskForm(props: TaskFormProps) {
    const [inputText, setInputText] = useState<string>("");

    function changeInputText(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setInputText(event.currentTarget.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            text: { value: string };
        };
        const text = target.text.value;

        props.onClickAdd({ id: 0, text: text });
        setInputText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={changeInputText} type='text' name='text' value={inputText}></input>
            <button type='submit' className="add-button">add</button>
        </form>
    )
}

export default TaskForm