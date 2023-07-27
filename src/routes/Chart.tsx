import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) { //props 넘겨주는게 헷갈린다.
	const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	return <h1>Chart</h1>
}

export default Chart;


/**
 * Chart component는 우리가 보고자 하는 가격의 암호화폐가 무엇인지
 * 알아야 한다.
 * 
 */