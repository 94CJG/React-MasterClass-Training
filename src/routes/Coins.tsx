
//import { useEffect, useState } from "react";
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
  color: ${(props) => props.theme.textColor};
  padding: 20px; 
  border-radius: 15px;
  margin-bottom: 10px;
	border: 1px solid red;
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
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (<Loader>"Loading..."</Loader>
			) : (<CoinsList>
					{data?.slice(0, 30).map((coin) => (
					<Coin key={coin.id}>
						<Link to={{
							pathname: `/${coin.id}`,
							state: { name: coin.name },
							 //다른 화면으로 state를 보내고 있는 것.
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


