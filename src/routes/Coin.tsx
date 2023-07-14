//	-> All coins 모든 코인들이 보여질 것이다.
//	:id -> /btc -> Coin Detail
//	Nested(중첩된) Router 사용 할 것이다
//	ㄴ what? 한 스크린 내에 또다른 Router를 가질수 있는 것이다.
//	ㄴ btc/information
//	ㄴ btc/chart

import { useParams } from "react-router-dom";
	interface RouteParmas {
		coinId: string;
	}


function Coin () {
		const {coinId} = useParams<RouteParmas>(); //URL의 파라미터 부분을 잡아내고 싶을때 사용.
		//또한 console.log() 파라미터를 확인 한다면,  URL의 파라미터들을 우리에게 준다.

	return <h1>Coin: {coinId}</h1>
}
export default Coin;
/**
 * const params = useParams();URL의 파라미터 부분을 잡아내고 싶을때 사용(console.log 이용).
 *
 */