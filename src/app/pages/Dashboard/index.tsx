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
									<h2 className="fw-600 text-primary my-0">10+</h2>
									<div className="bg-primary rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-inbox"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">Total Shelfs</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h2 className="fw-600 text-warning my-0">3432+</h2>
									<div className="bg-warning rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-shopping-bag"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">New Order</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h2 className="fw-600 text-info my-0">$ 532k</h2>
									<div className="bg-info rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dollar"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">Total Sales</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h2 className="fw-600 text-danger my-0">2453</h2>
									<div className="bg-danger rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div>
								</div>
								<p className="fs-18 mt-10">Units Sold</p>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header">
								<h4 className="box-title">Top Cities</h4>
							</div>
							<div className="box-body py-0">
								<div id="topcities"></div>
							</div>
							<div className="box-footer">
								<div className="d-flex justify-content-between">
									<div className="d-flex">
										<p className="me-10 mb-0">Show</p>
										<div className="btn-group">
											<button
												className="btn btn-xs btn-primary-light dropdown-toggle"
												type="button"
												data-bs-toggle="dropdown"
											>
												5 Result
											</button>
											<div className="dropdown-menu">
												<a className="dropdown-item" href="#">
													10 Result
												</a>
												<a className="dropdown-item" href="#">
													15 Result
												</a>
												<a className="dropdown-item" href="#">
													20 Result
												</a>
											</div>
										</div>
									</div>
									<div className="d-flex">
										<p className="me-10 mb-0">Short By</p>
										<div className="btn-group">
											<button
												className="btn btn-xs btn-primary-light dropdown-toggle"
												type="button"
												data-bs-toggle="dropdown"
											>
												Order
											</button>
											<div className="dropdown-menu">
												<a className="dropdown-item" href="#">
													Delivery Date
												</a>
												<a className="dropdown-item" href="#">
													Payment
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header">
								<h4 className="box-title">Inventory Stock</h4>
							</div>
							<div className="box-body">
								<div id="recent_trend"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-8 col-12">
						<div className="box position-static">
							<div className="box-header">
								<h4 className="box-title">Section Overview</h4>
								<div className="box-controls pull-right">
									<input
										className="form-control no-border bg-lightest"
										id="e"
										type="date"
									/>
								</div>
							</div>
							<div className="box-body">
								<div className="row mb-20">
									<div className="col-lg-3 col-md-6 col-12">
										<div className="row g-0 row-cols-auto">
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-6 col-12">
										<div className="row g-0 row-cols-auto">
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<div className="m-5 h-40 w-40"> </div>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-12">
										<div className="row g-0 row-cols-auto">
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<div className="m-5 h-40 w-40"> </div>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-3 col-md-6 col-12">
										<div className="row g-0 row-cols-auto">
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-6 col-12">
										<div className="row g-0 row-cols-auto">
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<div className="m-5 h-40 w-40"> </div>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-12">
										<div className="row g-0 row-cols-auto">
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<div className="m-5 h-40 w-40"> </div>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning-light d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">Empty</h4>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="col">
												<div className="section-bx">
													<a
														href="#"
														className="bg-warning d-block rounded10 m-5 h-40 w-40"
													>
														<div className="bx-dec">
															<div className="section-dec d-flex align-items-center">
																<div className="box-img">
																	<img
																		src="../images/box.png"
																		className="img-fluid"
																		alt=""
																	/>
																</div>
																<div className="dec">
																	<h4 className="my-0 text-white">
																		Row 3 #124578
																	</h4>
																	<p className="text-white">
																		H60 x W60 x 20 KG
																	</p>
																	<p className="text-white-50 mb-0">
																		Delivered 06:15PM
																	</p>
																</div>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex mt-20">
									<div className="d-flex">
										<div className="bg-warning-light h-20 w-20 rounded"></div>
										<h5 className="mx-15 my-0">Free Place</h5>
									</div>
									<div className="d-flex">
										<div className="bg-warning h-20 w-20 rounded"></div>
										<h5 className="mx-15 my-0">Loaded Place</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-xl-4">
						<div className="box overflow-h">
							<div className="box-header no-border">
								<h4 className="box-title">Revenue Overview</h4>
								<ul className="box-controls pull-right">
									<li className="dropdown">
										<a
											data-bs-toggle="dropdown"
											href="#"
											className="btn btn-success-light base-font px-10"
										>
											Export
										</a>
										<div className="dropdown-menu dropdown-menu-end">
											<a className="dropdown-item" href="#">
												<i className="ti-import"></i> Import
											</a>
											<a className="dropdown-item" href="#">
												<i className="ti-export"></i> Export
											</a>
											<a className="dropdown-item" href="#">
												<i className="ti-printer"></i> Print
											</a>
											<div className="dropdown-divider"></div>
											<a className="dropdown-item" href="#">
												<i className="ti-settings"></i> Settings
											</a>
										</div>
									</li>
								</ul>
							</div>
							<div className="box-body py-0">
								<div className="row">
									<div className="col-6">
										<div className="py-10">
											<div className="text-fade fw-600">Average Profit</div>
											<div className="fs-18 fw-600">$150K</div>
										</div>
									</div>
									<div className="col-6">
										<div className="py-10">
											<div className="text-fade fw-600">Revenue</div>
											<div className="fs-18 fw-600">$15,250k</div>
										</div>
									</div>
									<div className="col-6">
										<div className="py-10">
											<div className="text-fade fw-600">Taxes</div>
											<div className="fs-18 fw-600">$50k</div>
										</div>
									</div>
									<div className="col-6">
										<div className="py-10">
											<div className="text-fade fw-600">Yearly Income</div>
											<div className="fs-18 fw-600">$44,850k</div>
										</div>
									</div>
								</div>
							</div>
							<div className="box-body p-0">
								<div id="revenue4" className="text-dark min-h-auto"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-12">
						<div className="box" id="bt-sellers">
							<div className="box-header">
								<h4 className="box-title">Best Sellers This Quarter</h4>
							</div>
							<div className="box-body">
								<div className="inner-user-div3">
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Kelly Bookshelf</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">124 Units</h3>
												<p className="mb-0">
													<span>$588 per unit</span> | <strong>$72,931</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Darcy Side Table</h5>
												<p className="mb-0">BR 3039</p>
											</div>
											<div>
												<h3 className="my-5">107 Units</h3>
												<p className="mb-0">
													<span>$188 per unit</span> | <strong>$20,116</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Clarissa Chaise</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">102 Units</h3>
												<p className="mb-0">
													<span>$980 per unit</span> | <strong>$99,960</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Sheffield Bedframe</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">98 Units</h3>
												<p className="mb-0">
													<span>$140 per unit</span> | <strong>$37,200</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Amelia Floorlamp</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">93 Units</h3>
												<p className="mb-0">
													<span>$110 per unit</span> | <strong>$10,230</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Kelly Bookshelf</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">124 Units</h3>
												<p className="mb-0">
													<span>$588 per unit</span> | <strong>$72,931</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Darcy Side Table</h5>
												<p className="mb-0">BR 3039</p>
											</div>
											<div>
												<h3 className="my-5">107 Units</h3>
												<p className="mb-0">
													<span>$188 per unit</span> | <strong>$20,116</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Clarissa Chaise</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">102 Units</h3>
												<p className="mb-0">
													<span>$980 per unit</span> | <strong>$99,960</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Sheffield Bedframe</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">98 Units</h3>
												<p className="mb-0">
													<span>$100 per unit</span> | <strong>$17,200</strong>
												</p>
											</div>
										</div>
									</div>
									<div className="box-shadowed rounded10 mb-10 p-10">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="my-5">Amelia Floorlamp</h5>
												<p className="mb-0">BR 8129</p>
											</div>
											<div>
												<h3 className="my-5">93 Units</h3>
												<p className="mb-0">
													<span>$110 per unit</span> | <strong>$10,230</strong>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8 col-12">
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">list of sections</h4>
							</div>
							<div className="box-body pt-0">
								<div className="table-responsive">
									<table className="mb-0 table">
										<tr>
											<td>
												<a href="javascript:void(0)">Section 001</a>
											</td>
											<td>
												<span className="text-muted text-nowrap">
													<i className="fa fa-calendar-o text-success-light mx-5"></i>{" "}
													05-12-2021
												</span>{" "}
											</td>
											<td>
												<div className="d-flex align-items-center">
													<span className="mx-5">Used</span>
													<div className="progress progress-xs w-p100 mt-0">
														<div
															className="progress-bar bg-primary"
															role="progressbar"
															style={{ width: "20%" }}
															aria-valuenow={50}
															aria-valuemin={0}
															aria-valuemax={100}
														></div>
													</div>
												</div>
											</td>
											<td className="text-end">20%</td>
										</tr>
										<tr>
											<td>
												<a href="javascript:void(0)">Section 002</a>
											</td>
											<td>
												<span className="text-muted text-nowrap">
													<i className="fa fa-calendar-o text-success-light mx-5"></i>{" "}
													05-12-2021
												</span>{" "}
											</td>
											<td>
												<div className="d-flex align-items-center">
													<span className="mx-5">Used</span>
													<div className="progress progress-xs w-p100 mt-0">
														<div
															className="progress-bar bg-primary"
															role="progressbar"
															style={{ width: "28%" }}
															aria-valuenow={50}
															aria-valuemin={0}
															aria-valuemax={100}
														></div>
													</div>
												</div>
											</td>
											<td className="text-end">28%</td>
										</tr>
										<tr>
											<td>
												<a href="javascript:void(0)">Section 003</a>
											</td>
											<td>
												<span className="text-muted text-nowrap">
													<i className="fa fa-calendar-o text-success-light mx-5"></i>{" "}
													05-12-2021
												</span>{" "}
											</td>
											<td>
												<div className="d-flex align-items-center">
													<span className="mx-5">Used</span>
													<div className="progress progress-xs w-p100 mt-0">
														<div
															className="progress-bar bg-danger"
															role="progressbar"
															style={{ width: "80%" }}
															aria-valuenow={50}
															aria-valuemin={0}
															aria-valuemax={100}
														></div>
													</div>
												</div>
											</td>
											<td className="text-end">80%</td>
										</tr>
										<tr>
											<td>
												<a href="javascript:void(0)">Section 004</a>
											</td>
											<td>
												<span className="text-muted text-nowrap">
													<i className="fa fa-calendar-o text-success-light mx-5"></i>{" "}
													05-12-2021
												</span>{" "}
											</td>
											<td>
												<div className="d-flex align-items-center">
													<span className="mx-5">Used</span>
													<div className="progress progress-xs w-p100 mt-0">
														<div
															className="progress-bar bg-warning"
															role="progressbar"
															style={{ width: "50%" }}
															aria-valuenow={50}
															aria-valuemin={0}
															aria-valuemax={100}
														></div>
													</div>
												</div>
											</td>
											<td className="text-end">50%</td>
										</tr>
										<tr>
											<td>
												<a href="javascript:void(0)">Section 005</a>
											</td>
											<td>
												<span className="text-muted text-nowrap">
													<i className="fa fa-calendar-o text-success-light mx-5"></i>{" "}
													05-12-2021
												</span>{" "}
											</td>
											<td>
												<div className="d-flex align-items-center">
													<span className="mx-5">Used</span>
													<div className="progress progress-xs w-p100 mt-0">
														<div
															className="progress-bar bg-warning"
															role="progressbar"
															style={{ width: "58%" }}
															aria-valuenow={50}
															aria-valuemin={0}
															aria-valuemax={100}
														></div>
													</div>
												</div>
											</td>
											<td className="text-end">58%</td>
										</tr>
										<tr>
											<td>
												<a href="javascript:void(0)">Section 006</a>
											</td>
											<td>
												<span className="text-muted text-nowrap">
													<i className="fa fa-calendar-o text-success-light mx-5"></i>{" "}
													05-12-2021
												</span>{" "}
											</td>
											<td>
												<div className="d-flex align-items-center">
													<span className="mx-5">Used</span>
													<div className="progress progress-xs w-p100 mt-0">
														<div
															className="progress-bar bg-success"
															role="progressbar"
															style={{ width: "36%" }}
															aria-valuenow={50}
															aria-valuemin={0}
															aria-valuemax={100}
														></div>
													</div>
												</div>
											</td>
											<td className="text-end">36%</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">Average Inventory Turnaround</h4>
							</div>
							<div className="box-body py-0">
								<div id="overview_trend"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};
