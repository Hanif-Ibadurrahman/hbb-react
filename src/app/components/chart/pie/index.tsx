import ReactApexChart from "react-apexcharts";
interface IPieChart {
	title?: string;
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
	labels?: string[];
	width?: string | number;
	height?: string | number;
}

export const PieChart = ({
	title,
	series,
	labels,
	width,
	height,
}: IPieChart) => {
	const options: ApexCharts.ApexOptions = {
		chart: {
			type: "pie",
		},
		noData: {
			text: "No Data",
			align: "center",
			verticalAlign: "middle",
			offsetX: 0,
			offsetY: 0,
			style: {
				color: undefined,
				fontSize: "14px",
				fontFamily: undefined,
			},
		},
		labels: labels,
		fill: {
			type: "gradient",
		},
		title: {
			text: title,
		},
		legend: {
			formatter: function (val, opts) {
				return val + ": " + opts.w.globals.series[opts.seriesIndex];
			},
		},
		responsive: [
			{
				options: {
					legend: {
						position: "bottom",
					},
				},
			},
		],
		dataLabels: {
			formatter(val: number, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex];
				return [name, val.toFixed(1) + "%"] as any;
			},
		},
	};

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="pie"
			width={width}
			height={height}
		/>
	);
};
