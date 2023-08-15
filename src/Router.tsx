import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
	//만약 Router가 App.tsx에 있는 function을 받도록 하고 싶다면, 
	//function이 어떻게 생겼는지 명시를 해줘야한다.

	toggleDark: () => void;
	isDark: boolean;
	 // 이 코드는 우리가 toggleDark라는 함수를 받고자 한다고 말 하는 것이다.
	 // 아무 argument도 받지 않고, void를 return하는 함수를 뜻한다.
	 // void란? 아무것도  없다는 의미이다.
}

function Router({toggleDark, isDark}:IRouterProps) {
	return( 
	<BrowserRouter>
		<Switch>
			<Route path="/:coinId"> 
			{/* <Route path="/:coinId"> 
			우리가 우리 Router에게 우리의 URL이 변수값을 갖는다는 말해주는 방식이다.
			Router에게 URL의 이 부분의 값에 우린 관심이 있다고 말해주는 방법.
			*/}
				<Coin isDark={isDark} />
			</Route>
			<Route path="/">
				<Coins toggleDark = {toggleDark} />
			</Route>
		</Switch>
	</BrowserRouter>
	);
};

export default Router;