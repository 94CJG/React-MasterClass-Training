
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteParmas {
	coinId: string;
}

interface RouteState {
	name: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: object;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	}
};

function Coin() {
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<RouteParmas>();
	const { state } = useLocation<RouteState>();
	const [info, setInfo] = useState<InfoData>();
	const [priceInfo, setPriceInfo] = useState<PriceData>();
	//console.log(state); // 타이틀에 coin의 name을 직접 뿌려줄 수 있다는 의미이다.
	//console.log(coinId);
	useEffect(() => {
		(async () => {
			const infoData = await ((await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()); //API 받아오는 코드를 캡슐화된 코드
			//console.log(infoData)
			const priceData = await ((await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json());
			//console.log(priceData)
			setInfo(infoData); // 타입스크립트는 빈 객체로 인식해서 화면에는 아무것도 보여지지 않는다.
			setPriceInfo(priceData);
		})();
	}, [])
	return (
		<Container>
			<Header>
				<Title>{state?.name || "Loading.."} </Title>
			</Header>
			{loading ? (<Loader>Loading...</Loader>) : null}
		</Container>
	);
}
export default Coin;

/**
 * 이번강의 내용 요약
 * console.log()를 이용하여 API내용 확인.
 * API내용을 확인 후 Store object as global variable를 이용하여 해당 원하는 값을 가지고 온다.
 * Object.keys(temp1).map((k) => typeof k).join() 를 이용했다.
 * type Script에 해당하는 타입을 작성하였다.
 * useState() 타입을 지정.
 * 타이 스크립트에서 인터페이스 명을 지정해줄 때 관례로 맨 앞에 I를 붙이거나 or 안붙인다. 그건 개인 맘대로!
 * 
 */
