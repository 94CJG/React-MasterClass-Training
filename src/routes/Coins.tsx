
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from 'styled-components';

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

interface CoinInterface {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string,
}

function Coins() {
	const [coins, setCoins] = useState<CoinInterface[]>([]); // 타입스크립트는 현재 coin이 무엇인지 모른다. 
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
	console.log(coins);
	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			{loading ? (<Loader>"Loading..."</Loader>
			) : (<CoinsList>
				{coins.map((coin) => (
					<Coin key={coin.id}>
						<Link to={{
								pathname: `/${coin.id}`,
								state: { name: coin.name}, //다른 화면으로 state를 보내고 있는 것.
						}}>
								<Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
								/> {/** 질문예정 */}
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
 * ()() 에 대한 설명 필요 
 * Link to를 통해서 웹에 표현 되고, 클릭시 해당 페이지로 넘어가는 로직을 이해를 잘 못함
 * 
 * 
 * 보이지 않는 방식으로(비하인드더씬) 데이터를 어떻게 보내는 방법이 있다. (92번쨰줄 설명 주석)
 * 파라미터를 이용하여 URL에게 코인에 대한 정보를 넘기는 방식으로 했다.
 * ㄴ <Link to = {}`/${coin.id}`> 이방법이 아닌
 * state를 사용하여 다른 화면과 소통 할 수 있다.
 * state란 비하인드 더 씬 소통 같은 것 이다.
 * ㄴ	<Link to={{ pathname: `/${coin.id}`, state: { name: coin.name}, //다른 화면으로 state를 보내고 있는 것.}}>
 * 객체를 이용하여 데이터를 전송 할 수 있다.
 */
