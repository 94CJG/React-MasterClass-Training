import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Link, Route } from "react-router-dom";

interface IHistorical {
	time_open: string;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) { //props 넘겨주는게 헷갈린다.
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	//console.log(data?.map((price) => price.high));
	return (
		//ApexChart문제점 
		/**
		 * map을 사용시 처음 함수로 불러오려고 했던 것은 타입스크립트로 인한 문자열 이였다, 그래서 코드상 parseFloat을 사용했기 때문에
		 * 함수 적용시 안되는 것 ! 그래서 number인 형태를 가져와서 진행 해봤더니 성공 하였다!!
		 */
		<div>
			{isLoading ? "Loading chart..." :
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "price",
							data: data?.map((price) =>({
								x: price.close,
								y: [price.open, price.high, price.low, price.close]
							})) ?? []
						},
					]}
					options={{
						theme: {
							mode: "dark"
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: false },
						stroke: {
							curve: "smooth",
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: "datetime",
							categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()
							),
						},
						fill: {
							type: "gradient",
							gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
						},
						colors: ["blue"],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							}
						}
					}} />}
					
					<Link to = {"/"}><button>back</button></Link> 
		</div>
	)
}

export default Chart;

// time_open: string; 부분을 맵을 통해서 날짜로 변환을 한 다음 보여주는 형식으로 한다.
// data 형식 타입스크립트에