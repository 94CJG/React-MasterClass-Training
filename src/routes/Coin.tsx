
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

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


function Coin() {
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<RouteParmas>();
	const { state } = useLocation<RouteState>();
	//console.log(state.name); // 타이틀에 coin의 name을 직접 뿌려줄 수 있다는 의미이다.
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
 * Coins.tsx는 코인의 name을 이용해서 State를 보내고 있다,
 * Coin.tsx는 react router DOM이 보내주는 location object에 접근하면 된다.
 *
 */