export function fetchCoins() {
	return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json()
	);
}

/**
 * 사용하기 위해서는 첫 단계로 fetcher함수를 만들어야 한다.
 * fetcher 함수는 꼭 promise를 return 해줘야 한다.
 * json data의 Promise를 반환 해준다.
 */