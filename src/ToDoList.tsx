import { useState } from "react";

function ToDoList() {
	const [toDo, setToDo] = useState("");
	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		const { currentTarget: {value}, } = event; //
		setToDo(value);
	};
	const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(toDo);
	};
	
	return (
		<div>
			<h1>ToDo-List Start</h1>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={toDo} placeholder="Write a to do" />
				<button>Add</button>
			</form>
		</div>
	);
}
export default ToDoList;

/**
 *
 */
