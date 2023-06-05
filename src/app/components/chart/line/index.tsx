import ReactApexChart from "react-apexcharts";

interface ILineChart {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	categories: any;
	width?: string | number;
	height?: string | number;
}

export const LineChart = ({
	series,
	categories,
	width,
	height,
}: ILineChart) => {
	const options: ApexCharts.ApexOptions = {
		chart: {
			type: "line",
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		title: {
			text: "Nilai Total per Bulan",
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: categories,
		},
		yaxis: {
			title: {
				text: "Rp (Juta)",
			},
		},
		fill: {
			type: "gradient",
			opacity: 1,
		},
	};

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="line"
			width={width}
			height={height}
		/>
	);
};
