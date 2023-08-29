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

interface IForm {
	email: string;
	firstName: string;
	lsatName: string;
	username: string;
	password: string;
	password1: string;
}

function ToDoList() {
	const { register, handleSubmit, formState:{errors} } = useForm<IForm>({
		defaultValues: {
			email: "@naver.com",
		}, 
	});
	const onValid = (data: any) => {
		console.log(data);
	};
	console.log(errors);
	return (
		<div>
			<h1>ToDo-List Start</h1>
			<form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}> {/** 12 ~ 18번째 줄 대체 */}
				<input {...register("email", {
					required: "Email is required",
					pattern: {
						value: /^[A-Za-z0-9._%+-]+@naver.com$/,
						message: "Only naver.com emails allowed",
					},
				})} 
				placeholder="Email"
				/>
				<span>{errors?.email?.message}</span> {/* 오류발생함. 원인: 타입스크립트 선언을 안해서 발생하는 문제  */}

				<input {...register("firstName", { required: "write here" })} placeholder="first Name" />
				<span>{errors?.firstName?.message}</span>

				<input {...register("lsatName", { required: "write here" })} placeholder="last Name" />
				<span>{errors?.lsatName?.message}</span> 
				
				<input {...register("username", { required: "write here", minLength: 10 })} placeholder="user Name" />
				<span>{errors?.username?.message}</span>
				
				<input {...register("password", { required: "write here", minLength: 5 })} placeholder="passwWord" />
				<span>{errors?.password?.message}</span>

				<input {...register("password1", {
						required: "Passwird is required",
						minLength: {
						value: 5,
						message: "Your password is too short."
					}
				})} placeholder="PassWord1" />
				<span>{errors?.password1?.message}</span> 
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;

/**
 * #6.8 Form Errors

 * ㅁ 정규식 표현을 사용하여 유효성 검사를 편리하게 할 수 있다.
 * -> ^ 문장의 시작
 * -> + 하나 또는 하나이상
 * -> ^[A-Za-z0-9._%+-]+@naver.com$ 
 * -> 기호와 숫자: A ~ Z, a ~ z, 0 ~ 9,
 * -> 특수문자:  . , _ , %, +, -
 * -> @naver.com 문자열로 일치 해야함.
 * 
 * ㅁ React Hook Form은 TypeScript로 빌드 되었으며, FormData 유형을 정의하여 값을 지원 가능하다.
 * ㅁ const { register, handleSubmit, formState:{errors} } = useForm<IForm>({
		defaultValues: { email: "@naver.com" }}
		-> defaultValues 사용자와 상호작용 하기 전 input값에서 먼저 보여준다.
		-> defaultValues 값을 설정 할 때 null 또는 " " 빈 문자열로 정의 하지 않는게 좋다.
 * 
 */
