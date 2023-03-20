import { currentYear } from "app/helper/DateHelper";

export const Sidebar = () => {
	return (
		<aside className="main-sidebar">
			<section className="sidebar position-relative">
				<div className="multinav">
					<div className="multinav-scroll" style={{ height: "100%" }}>
						<ul className="sidebar-menu" data-widget="tree">
							<li className="treeview">
								<a href="#">
									<i data-feather="home"></i>
									<span>Dashboard</span>
								</a>
							</li>
							<li className="treeview">
								<a href="#">
									<i data-feather="package"></i>
									<span>HBB dan Inventaris</span>
								</a>
							</li>
							<li className="treeview">
								<a href="#">
									<i data-feather="smile"></i>
									<span>Layanan HBB</span>
								</a>
							</li>
							<li className="treeview">
								<a href="#">
									<i data-feather="printer"></i>
									<span>Cetak Barcode</span>
								</a>
							</li>
							<li className="treeview">
								<a href="#">
									<i data-feather="monitor"></i>
									<span>Reporting</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</a>
								<ul className="treeview-menu">
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Daftar Inventaris Ruangan
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Laporan HBB dan Inventaris
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Lampiran HBB dan Inventaris Semester
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Laporan Inventaris Koorporat
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Formulir Izin Keluar dan Masuk Gudang
										</a>
									</li>
								</ul>
							</li>
							<li className="treeview">
								<a href="#">
									<i data-feather="database"></i>
									<span>Master</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</a>
								<ul className="treeview-menu">
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Bisnis Unit
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Area
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Barang
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Divisi
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Kode Group
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Kondisi
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Lokasi
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Negara
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Pegawai
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Pengelola
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Penyedia
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Satuan Kerja
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											User
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Warna
										</a>
									</li>
								</ul>
							</li>
							<li className="treeview">
								<a href="#">
									<i data-feather="clipboard"></i>
									<span>Tiket Layanan</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</a>
								<ul className="treeview-menu">
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Riwayat Tiket Layanan
										</a>
									</li>
									<li>
										<a href="index2.html">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Pemindahan
										</a>
									</li>
								</ul>
							</li>
						</ul>

						<div className="sidebar-widgets">
							<div className="copyright m-10 text-white-50 text-center">
								<p>
									<strong className="d-block">
										Aplikasi Manajemen HBB & Inventaris
									</strong>
									©{currentYear} All Rights Reserved
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</aside>
	);
};
