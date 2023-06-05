import ReactApexChart from "react-apexcharts";
interface IColumnChart {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	categories: any;
	width?: string | number;
	height?: string | number;
}

export const ColumnChart = ({
	series,
	categories,
	width,
	height,
}: IColumnChart) => {
	const options: ApexCharts.ApexOptions = {
		chart: {
			type: "bar",
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "55%",
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ["transparent"],
		},
		title: {
			text: "Jumlah Barang per Bulan",
			align: "left",
		},
		xaxis: {
			categories: categories,
		},
		yaxis: {
			title: {
				text: "Jumlah per Item",
			},
		},
		fill: {
			type: "gradient",
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return "Jumlah " + val + " Item";
				},
			},
		},
	};

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="bar"
			width={width}
			height={height}
		/>
	);
};
