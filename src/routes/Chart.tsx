import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
	time_open: string;
	time_close: number;
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
							name: "price",
							data: data?.map((price) => parseFloat(price.close)) ?? []
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
		</div>
	)
}

export default Chart;

// time_open: string; 부분을 맵을 통해서 날짜로 변환을 한 다음 보여주는 형식으로 한다.
// data 형식 타입스크립트에