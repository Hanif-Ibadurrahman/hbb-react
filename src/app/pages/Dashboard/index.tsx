import { MainLayout } from "app/layout/MainLayout";

const Dashboard = () => {
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
								<h4 className="box-title">Column Chart</h4>
							</div>
							<div className="box-body">
								<div id="column-chart"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">Simple Line Chart</h4>
							</div>
							<div className="box-body">
								<div id="line-chart"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-12 col-12">
						<div className="box">
							<div className="box-body analytics-info">
								<h4 className="box-title">Basic Pie chart</h4>
								<div id="basic-pie" style={{ height: "400px" }}></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default Dashboard;
