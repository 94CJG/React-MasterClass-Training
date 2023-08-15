//import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ $isactive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${props =>
	props.$isactive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
`;


interface RouteParams {
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
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
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
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

interface ICoinProps {
	isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");
	const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId],
		() => fetchCoinTickers(coinId),
		{
			//refetchInterval: 3.6e+6,
			//useQuery hook의 3번째 argument를 쓸 수 있는 방법.
			//리액트 쿼리를 통하여 변환 확인 가능. 현재 1시간으로 해두었다. 08-06-20:23 -> 29097.323
			//공부 끝났을 때 변경해두기. 
		}
	);
	/**
	 *
	 */
	/*routematch에게 우리가 coinId/price라는 URL에 있는지 확인 해달라고 할 것이다.
	없다면 null값을 반환한다.*/
	//console.log(priceMatch);
	/*const [loading, setLoading] = useState(true);
	const [info, setInfo] = useState<InfoData>();
	const [priceInfo, setPriceInfo] = useState<PriceData>();
	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			setInfo(infoData);
			setPriceInfo(priceData);
			setLoading(false);
		})();
	}, [coinId]);*/
	const loading = infoLoading || tickersLoading
	return (
		<Container>
			<Header>
				<Title>
					{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
								<span>Price:</span>
								<span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
						<Tabs>
							<Tab $isactive={chartMatch !== null ? true : false}>
								<Link to={`/${coinId}/chart`}>Chart</Link>
							</Tab>
							<Tab $isactive={priceMatch !== null ? true : false}>
								<Link to={`/${coinId}/price`}>Price</Link>
							</Tab>
						</Tabs>

					<Switch>
						<Route path={`/${coinId}/price`}>
							<Price coinId={coinId}/>
						</Route>
						<Route path={`/${coinId}/chart`}>
							<Chart isDark={isDark} coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}
export default Coin;

/** Cors 문제와 received `true`for a non-boolean attribute 문제
 * ㅁ Cors 오류
 * - 오류문구: Access to fetch at 'http://localhost:3001/test' from orgin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response servers your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 * 
 * 상황: 강의에서 사용하던 API가 유료화가 됐고, main에 나오는 값들은 정상작동 하고 있으나, 코인의 가격들을 볼수가 없어서, 니코쌤이 만드신 API로 대체함.
 * 
 * 문제: API요청 출처가 두개이상이면 발생하는 오류 발생
 * 
 * 해결: 정확한 원인은 모르나 package.json 안에 "proxy": "http://localhost:3000" 내용추가
 * 
 * ㅁ received `true`for a non-boolean attribute 오류
 * - 오류문구: Waring: Received `false` for a none-boolean attribute `primary`
 * 
 * 상황: 강의에 클론코딩을 하면서 진행중 에러가 발생
 * 
 * 문제: 64번째줄의 props 문제로 발견 되었다.
 *  - Tebs의 부모 스타일 컴포넌트에서 Tab 아들 컴포넌트에게 props를 전달하려 하였으나, 에러발생함.
 *  - 원인은 HTML의 Attributes로 DOM을 조작하기를 희망하는 것인지 StyleComponets의 props로 주려는 것인지 정확히 구별을 해줘야 에러 발생이 안된다.
 *
 * 해결: StyleComponets에서 props로 넘겨주려는 프로퍼티 앞에
 	 $를 붙여줘서 구별을 해주면 해결됨. 
*/