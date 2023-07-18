//TypeScript에서 사용하기 위해 
//styled components의 테마를 정의를 확장하는 것 이다.
import 'styled-components';


// and extend them!
//declare module 'styled-components' {
  export interface DefaultTheme {
		textColor: string;
		bgColor: string;
		accentColor: string;
  }
//}