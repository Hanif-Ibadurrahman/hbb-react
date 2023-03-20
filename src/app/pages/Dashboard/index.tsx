import { MainLayout } from "app/layout/MainLayout";

export const Dashboard = () => {
	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h1 className="fw-600 text-primary my-0">10+</h1>
									<div className="bg-primary rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-tasks"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">Task</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h1 className="fw-600 text-success my-0">2453</h1>
									<div className="bg-success rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">Jumlah Barang</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-danger my-0">2453</h5>
										<h5 className="fw-600 text-warning my-0">2453</h5>
									</div>
									<div className="bg-danger rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">HBB & Inventaris</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-info my-0">Rp 532k</h5>
										<h5 className="fw-600 text-mute my-0">Rp 532k</h5>
									</div>
									<div className="bg-info rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dollar"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">Nilai Total</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};
