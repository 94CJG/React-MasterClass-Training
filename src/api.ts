const BASE_URL = `https://api.coinpaprika.com/v1`;
const NEW_URL = `https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin`;

export function fetchCoins() {
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string){
	return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string){
	return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}


export function fetchCoinHistory(coinId:string) {
	return fetch(`${NEW_URL}`).then((response) => response.json());
}

/**
 * 사용하기 위해서는 첫 단계로 fetcher함수를 만들어야 한다.
 * fetcher 함수는 꼭 promise를 return 해줘야 한다.
 * json data의 Promise를 반환 해준다.
 */