import ReactApexChart from "react-apexcharts";

interface IPieChart {
	title?: string;
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	labels?: string[];
}

export const PieChart = ({ title, series, labels }: IPieChart) => {
	const options: ApexCharts.ApexOptions = {
		chart: {
			width: 380,
			type: "pie",
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
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
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
		<ReactApexChart options={options} series={series} type="pie" width={380} />
	);
};
