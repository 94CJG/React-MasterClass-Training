import {DefaultTheme} from "styled-components";

export const darkTheme: DefaultTheme = { //styled.d.ts에서 정의를 해줘서 자동완성으로 보여진다.
	bgColor:"#2f3640",
	textColor:"white",
	accentColor:"#9c88ff",
	border:"1px solid red",
};

export const lightTheme: DefaultTheme = { //styled.d.ts에서 정의를 해줘서 자동완성으로 보여진다.
	bgColor:"whitesmoke",
	textColor:"black",
	accentColor:"#9c88ff",
	border:"1px solid black",
};