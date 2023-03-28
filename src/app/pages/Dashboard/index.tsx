import { ColumnChart } from "app/components/Chart/Column";
import { LineChart } from "app/components/Chart/Line";
import { PieChart } from "app/components/Chart/Pie";
import { MainLayout } from "app/layout/MainLayout";

const Dashboard = () => {
	const fetchDataLine = {
		months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
		data: [
			{ name: "HBB", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
			{ name: "Inventaris", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
		],
	};

	const fetchDataColumn = {
		months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
		data: [
			{ name: "HBB", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
			{ name: "Inventaris", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
		],
	};

	const fetchDataPie = {
		label: ["Baik", "Rusak", "Hilang"],
		data: [2000, 400, 54],
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-xl-2 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h5 className="fw-600 text-primary my-0">10+</h5>
									{/* <div className="bg-primary rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-tasks"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Task</p>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h5 className="fw-600 text-danger my-0">2454</h5>
									{/* <div className="bg-danger rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Jumlah Barang</p>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-info my-0">1227</h5>
									</div>
									{/* <div className="bg-info rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Total HBB</p>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-warning my-0">1227</h5>
									</div>
									{/* <div className="bg-warning rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Total Inventaris</p>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-success my-0">Rp 532k</h5>
									</div>
									{/* <div className="bg-success rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dollar"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Nilai Total HBB</p>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-mute my-0">Rp 532k</h5>
									</div>
									{/* <div className="bg-mute rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dollar"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Nilai Total Inventaris</p>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">Jumlah Barang</h4>
							</div>
							<div className="box-body">
								<ColumnChart
									series={fetchDataColumn.data}
									categories={fetchDataColumn.months}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">Nilai Total</h4>
							</div>
							<div className="box-body">
								<LineChart
									series={fetchDataLine.data}
									categories={fetchDataLine.months}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-12 col-12">
						<div className="box">
							<div className="box-body analytics-info">
								<h4 className="box-title">Kondisi Barang</h4>
								<PieChart
									series={fetchDataPie.data}
									labels={fetchDataPie.label}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default Dashboard;
