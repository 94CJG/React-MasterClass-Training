import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: string;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) { //props 넘겨주는게 헷갈린다.
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	//console.log(data?.map((price) => parseFloat(price.close)));
	return (
		<div>
			{isLoading ? "Loading chart..." :
				<ApexChart
					type="line"
					series={[
						{
							name: "hello",
							data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						},
						{
							name: "price",
							data: data?.map((price) => parseFloat(price.close)) ?? []
						},
					]}
					options={{
						theme: {
							mode: "dark"
						},
						chart: {
							height: 500,
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
						}
					}} />}
		</div>
	)
}

export default Chart;

// time_open: string; 부분을 맵을 통해서 날짜로 변환을 한 다음 보여주는 형식으로 한다.
// data 형식 타입스크립트에