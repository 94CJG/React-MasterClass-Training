import { useState } from "react";
import { useForm } from "react-hook-form";

/*function ToDoList() {
	const [toDo, setToDo] = useState("");
	const [toDoError, setToDoError] = useState("");
	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		const { currentTarget: {value}, } = event;
		setToDoError("");
		setToDo(value);
	};
	const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (toDo.length < 10) {
			return setToDoError("To do should be longer");
		}
		console.log("submit");
	};
	
	return (
		<div>
			<h1>ToDo-List Start</h1>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={toDo} placeholder="Write a to do" />
				<button>Add</button>
				{toDoError !== "" ? toDoError : null}
			</form>
		</div>
	);
}*/

function ToDoList() {
	const { register, watch } = useForm(); //register 함수를 사용하면 onChange 이벤트 핸들러가 필요없다.
	console.log(watch());
	return (
		<div>
			<h1>ToDo-List Start</h1>
			<form>
				<input {...register("email")} placeholder="Email" />
				<input {...register("firstName")} placeholder="First Name" />
				<input {...register("lsatName")} placeholder="Last Name" />
				<input {...register("username")} placeholder="User Name" />
				<input {...register("password")} placeholder="PasswWord" />
				<input {...register("password1")} placeholder="PassWord1" />
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;

/**
 * ㅁ JS 스프레드 연산자
 * <input {...register("toDo")} placeholder="Write a to do" />
 * 객체나 배열을 펼쳐서 해당 컨텍스트에 속한 개별 속성 또는 요소로 분리하는 역할을 한다.
 * 
 */
