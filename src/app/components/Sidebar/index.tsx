import { currentYear } from "app/helper/DateHelper";
import { Link } from "react-router-dom";

export const Sidebar = () => {
	return (
		<aside className="main-sidebar">
			<section className="sidebar position-relative">
				<div className="multinav">
					<div className="multinav-scroll" style={{ height: "100%" }}>
						<ul className="sidebar-menu" data-widget="tree">
							<li>
								<Link to={"/dashboard"}>
									<i data-feather="home"></i>
									<span>Dashboard</span>
								</Link>
							</li>
							<li>
								<Link to={"/inventaris"}>
									<i data-feather="package"></i>
									<span>HBB dan Inventaris</span>
								</Link>
							</li>
							<li>
								<Link to={"/layanan"}>
									<i data-feather="smile"></i>
									<span>Layanan HBB</span>
								</Link>
							</li>
							<li>
								<Link to={"/cetak-barcode"}>
									<i data-feather="printer"></i>
									<span>Cetak Barcode</span>
								</Link>
							</li>
							<li className="treeview menu-open">
								<Link to={""}>
									<i data-feather="monitor"></i>
									<span>Reporting</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul className="treeview-menu">
									<li>
										<Link to={"/daftar-inventaris-ruangan"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Daftar Inventaris Ruangan
										</Link>
									</li>
									<li>
										<Link to={"/laporan-hbb-dan-inventaris"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Laporan HBB dan Inventaris
										</Link>
									</li>
									<li>
										<Link to={"/lampiran-hbb-dan-inventaris"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Lampiran HBB dan Inventaris Semester
										</Link>
									</li>
									<li>
										<Link to={"/laporan-inventaris-koorporat"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Laporan Inventaris Koorporat
										</Link>
									</li>
									<li>
										<Link to={"/formulir-izin-keluar-dan-masuk-gudang"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Formulir Izin Keluar dan Masuk Gudang
										</Link>
									</li>
								</ul>
							</li>
							<li className="treeview menu-open">
								<Link to={""}>
									<i data-feather="database"></i>
									<span>Master</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul className="treeview-menu" style={{ display: "block" }}>
									<li>
										<Link to={"/master-bisnis-unit"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Bisnis Unit
										</Link>
									</li>
									<li>
										<Link to="/master-area">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Area
										</Link>
									</li>
									<li>
										<Link to="/master-barang">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Barang
										</Link>
									</li>
									<li>
										<Link to="/master-divisi">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Divisi
										</Link>
									</li>
									<li>
										<Link to="/master-kode-group">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Kode Group
										</Link>
									</li>
									<li>
										<Link to="/master-kondisi">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Kondisi
										</Link>
									</li>
									<li>
										<Link to="/master-lokasi">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Lokasi
										</Link>
									</li>
									<li>
										<Link to="/master-negara">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Negara
										</Link>
									</li>
									<li>
										<Link to="/master-pegawai">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Pegawai
										</Link>
									</li>
									<li>
										<Link to="/master-pengelola">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Pengelola
										</Link>
									</li>
									<li>
										<Link to="/master-penyedia">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Penyedia
										</Link>
									</li>
									<li>
										<Link to="/master-satuan-kerja">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Satuan Kerja
										</Link>
									</li>
									<li>
										<Link to="/master-user">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											User
										</Link>
									</li>
									<li>
										<Link to="/master-warna">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Warna
										</Link>
									</li>
								</ul>
							</li>
							<li className="treeview menu-open">
								<Link to="#">
									<i data-feather="clipboard"></i>
									<span>Tiket Layanan</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul className="treeview-menu">
									<li>
										<Link to="riwayat-tiket-layanan">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Riwayat Tiket Layanan
										</Link>
									</li>
									<li>
										<Link to="pemindahan">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Pemindahan
										</Link>
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
