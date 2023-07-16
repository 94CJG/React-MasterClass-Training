
import {Link} from "react-router-dom";
import { styled } from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
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
		transition: color 0.2s ease-in;
		display: block;
		//a 링크에 padding이 있을시 유저에게 더 편하게 다가올 수 있다.
		//마우스를 올렸을 때 보여진다.
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor };
		}
	}
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const coins = [
	{
		id: 'btc-bitcoin',
		name: 'Bitcoin',
		symbol: 'BTC',
		rank: 1,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'eth-ethereum',
		name: 'Ethereum',
		symbol: 'ETH',
		rank: 2,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'hex-hex',
		name: 'HEX',
		symbol: 'HEX',
		rank: 3,
		is_new: false,
		is_active: true,
		type: 'token',
	},
];

function Coins() {
	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			<CoinsList>
				{coins.map((coin) => (
					<Coin key={coin.id}>
						<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
					</Coin>
				))}
			</CoinsList>
		</Container>
	);
}
export default Coins;