
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from 'styled-components';
import { fetchCoins } from "../api";
import { useQuery } from "react-query";

const Container = styled.div`
  padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 20px; 
  border-radius: 15px;
  margin-bottom: 10px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
		//a 링크에 padding이 있을시 유저에게 더 편하게 다가올 수 있다.
		//마우스를 올렸을 때 보여진다.
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width:35px;
	height: 35px;
	margin-right: 10px;
`;

interface ICoin {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string,
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
	/**
	 * useQuery hook은 나의 fetcher 함수를 부른다.
	 * fetcher함수가 loading중이라면 react query는 그걸 알려줄 것 이다.
	 * useQuery는 fetcher 함수를 부르고 fetcher함수가 끝나면 react query는 json을 {data} 안에 넣을 것이다.
	 */


	/*const [coins, setCoins] = useState<CoinInterface[]>([]); // 타입스크립트는 현재 coin이 무엇인지 모른다. 
	//그래서 인터페이스 명을 지정해주고 그 옆에 []을 작성.
	//map에 대한 에러 오류해결됨.
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			const json = await response.json();
			setCoins(json.slice(0, 100)); //slice함수를 사용하여 0 ~ 100까지 기준으로 잘라준다.
			setLoading(false);
		})();// (() => )()
	}, []);
	//console.log(coins); */
	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (<Loader>"Loading..."</Loader>
			) : (<CoinsList>
				{data?.slice(0, 100).map((coin) => (
					<Coin key={coin.id}>
						<Link to={{
							pathname: `/${coin.id}`,
							state: { name: coin.name }, //다른 화면으로 state를 보내고 있는 것.
						}}>
							<Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}></Img>
							{coin.name} &rarr;
						</Link>
					</Coin>
				))}
			</CoinsList>)}
		</Container>
	);
}
export default Coins;

/**
 * react query??
 * 우리가 우리 스스로 실행하고 있었던 로직들을 축약해준다.
 * 사용하기 위해서는 첫 단계로 fetcher함수를 만들어야 한다.
 * fetcher 함수는 꼭 promise를 return 해줘야 한다.
 * usseQuery() hook은 react query로부터 왔다.
 * 2개의 argument를 필요로 한다.
 * ㄴ 첫 번째는 queryKey 이것은 고유식별자를 필요로 한다.
 * ㄴ 두 번째 argument는 fetcher 함수 이다.
 * useQuery라는 hook이 fetcher 함수 fetchCoins를 불러온다.
 * 
*/
