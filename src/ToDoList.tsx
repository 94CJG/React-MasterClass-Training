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
	const { register, handleSubmit, formState } = useForm();
	const onValid = (data: any) => {
		console.log(data);
	};
	console.log(register("todo"));
	console.log(formState.errors);
	return (
		<div>
			<h1>ToDo-List Start</h1>
			<form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}> {/** 12 ~ 18번째 줄 대체 */}
				<input {...register("email", { required: true })} placeholder="Email" />
				<input {...register("firstName", { required: true })} placeholder="First Name" />
				<input {...register("lsatName", { required: true })} placeholder="Last Name" />
				<input {...register("username", { required: true, minLength: 10 })} placeholder="User Name" />
				<input {...register("password", { required: true, minLength: 5 })} placeholder="PasswWord" />
				<input {...register("password1", { required: "Passwird is required", minLength: {
					value: 5,
					message: "Your password is too short."
				}})} placeholder="PassWord1" />
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;

/**
 * useForm( )에 대한 강의
 * handleSubmit && formState를 사용하여 form에 대한 유효성 검사와 자동으로 에러 처리해주는 모습과 옵션들을 수강함.
 * handleSubmit( arg1, arg2 )은 2개의 인자값을 필요로 한다. 첫 번째 인자값은 필수이며, 두 번째 부터는 필수가 아니다.
 * 오류에 대한 처리가 가능하다. ( 필수, 최소길이, 메세지 입력 등.. )
 * required를 자바스크립트로 넣은 이유는? 
 * -> 악의로 이용하여 개발자 도구로 HTML에 작성시 지워서 사용 할 수 있기 때문이다.
 * 
 */
