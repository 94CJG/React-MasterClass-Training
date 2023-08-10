import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IHistorical {
	time_open: string;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface PriceProps {
	coinId: string;
}

function Price({ coinId }: PriceProps) {
	// const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
	return (
		<div>
			<h1>Hello</h1>
			{/* {isLoading ? "Loading price" :
				
			} */}
		</div>
	)
}

export default Price;

/**
 * Nested router 혹은 nested route는 route안에 있는 또 다른 route 라고 한다.
 * ㄴ 웹사이트에서 탭을 사용 할 때 우릴 많이 도와줄 것이다.
 * 
 * 
 * 
 * 이번강의 내용 요약
 * CSS 컴포넌트는 소스를 가져옴
 */