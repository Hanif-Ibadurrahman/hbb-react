import { currentYear } from "app/helper/dateHelper";
import { useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

export const Sidebar = () => {
	const [selectedMenu, setSelectedMenu] = useState<{
		key: string;
		haveSubMenu?: boolean;
	}>({ key: "", haveSubMenu: false });

	const seletedMenuHandler = (thisKey: string, thisHaveSubMenu?: boolean) => {
		selectedMenu.key === thisKey && selectedMenu.haveSubMenu
			? setSelectedMenu({ key: "", haveSubMenu: thisHaveSubMenu })
			: setSelectedMenu({ key: thisKey, haveSubMenu: thisHaveSubMenu });
	};

	return (
		<aside className="main-sidebar">
			<section className="sidebar position-relative">
				<div className="multinav">
					<div className="multinav-scroll" style={{ height: "100%" }}>
						<ul className="sidebar-menu" data-widget="tree">
							<li
								className={`treeview ${
									selectedMenu.key === "dashboard" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("dashboard")}
							>
								<Link to={"/dashboard"}>
									<FeatherIcon icon={"home"} />
									<span>Dashboard</span>
								</Link>
							</li>
							<li
								className={`treeview ${
									selectedMenu.key === "inventaris" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("inventaris")}
							>
								<Link to={"/inventaris"}>
									<FeatherIcon icon={"package"} />
									<span>HBB dan Inventaris</span>
								</Link>
							</li>
							<li
								className={`treeview ${
									selectedMenu.key === "layanan" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("layanan", true)}
							>
								<Link to={""}>
									<FeatherIcon icon={"smile"} />
									<span>Layanan HBB</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul
									className="treeview-menu"
									style={{
										display: selectedMenu.key === "layanan" ? "block" : "none",
									}}
								>
									<li>
										<Link to={"/permintaan-layanan"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Permintaan
										</Link>
									</li>
									<li>
										<Link to={"/permintaan-perbaikan"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Perbaikan
										</Link>
									</li>
									<li>
										<Link to={"/permintaan-pemindahan"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Pemindahan
										</Link>
									</li>
									<li>
										<Link to={"/permintaan-pengembalian"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Pengembalian
										</Link>
									</li>
									<li>
										<Link to={"/permintaan-penggantian"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Penggantian
										</Link>
									</li>
									<li>
										<Link to={"/permintaan-perubahan"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Perubahan
										</Link>
									</li>
									<li>
										<Link to={"/permintaan-pemeriksaan"}>
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Permintaan Layanan -<br /> Pemeriksaan
										</Link>
									</li>
								</ul>
							</li>
							<li
								className={`treeview ${
									selectedMenu.key === "cetak-barcode" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("cetak-barcode")}
							>
								<Link to={"/cetak-barcode"}>
									<FeatherIcon icon={"printer"} />
									<span>Cetak Barcode</span>
								</Link>
							</li>
							<li
								className={`treeview ${
									selectedMenu.key === "reporting" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("reporting", true)}
							>
								<Link to={""}>
									<FeatherIcon icon={"monitor"} />
									<span>Reporting</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul
									className="treeview-menu"
									style={{
										display:
											selectedMenu.key === "reporting" ? "block" : "none",
									}}
								>
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
											Lampiran HBB dan <br /> Inventaris Semester
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
											Formulir Izin Keluar dan <br /> Masuk Gudang
										</Link>
									</li>
								</ul>
							</li>
							<li
								className={`treeview ${
									selectedMenu.key === "master" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("master", true)}
							>
								<Link to={""}>
									<FeatherIcon icon={"database"} />
									<span>Master</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul
									className="treeview-menu"
									style={{
										display: selectedMenu.key === "master" ? "block" : "none",
									}}
								>
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
										<Link to="/master-perusahaan">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Perusahaan
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
							<li
								className={`treeview ${
									selectedMenu.key === "tiket-layanan" ? "menu-open" : ""
								}`}
								onClick={() => seletedMenuHandler("tiket-layanan", true)}
							>
								<Link to="">
									<FeatherIcon icon={"clipboard"} />
									<span>Tiket Layanan</span>
									<span className="pull-right-container">
										<i className="fa fa-angle-right pull-right"></i>
									</span>
								</Link>
								<ul
									className="treeview-menu"
									style={{
										display:
											selectedMenu.key === "tiket-layanan" ? "block" : "none",
									}}
								>
									<li>
										<Link to="/riwayat-tiket-layanan">
											<i className="icon-Commit">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											Riwayat Tiket Layanan
										</Link>
									</li>
									<li>
										<Link to="/pemindahan">
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
