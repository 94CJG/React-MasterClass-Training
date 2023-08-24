import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {

}

function Router() {
	return( 
	<BrowserRouter>
		<Switch>
			<Route path="/:coinId"> 
			{/* <Route path="/:coinId"> 
			우리가 우리 Router에게 우리의 URL이 변수값을 갖는다는 말해주는 방식이다.
			Router에게 URL의 이 부분의 값에 우린 관심이 있다고 말해주는 방법.
			*/}
				<Coin />
			</Route>
			<Route path="/">
				<Coins />
			</Route>
		</Switch>
	</BrowserRouter>
	);
};

export default Router;