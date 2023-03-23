import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	localStorage.getItem("User");

	const DashboardPage = lazy(() => import("app/pages/Dashboard"));
	const HbbInventaryPage = lazy(() => import("app/pages/HbbInventory"));
	const LayananPage = lazy(() => import("app/pages/Layanan"));
	const CetakBarcodePage = lazy(() => import("app/pages/CetakBarcode"));
	const InventarisRuanganPage = lazy(
		() => import("app/pages/InventarisRuangan"),
	);
	const LaporanHbbInventarisPage = lazy(
		() => import("app/pages/LaporanHbbInventory"),
	);
	const LampiranHbbInventarisPage = lazy(
		() => import("app/pages/LampiranHbbInventory"),
	);
	const LaporanInventarisKoorporatPage = lazy(
		() => import("app/pages/LaporanInventarisKoorporat"),
	);
	const FormulirKeluarMasukGudangPage = lazy(
		() => import("app/pages/FormulirKeluarMasukGudang"),
	);
	const MasterAreaPage = lazy(() => import("app/pages/Master/MasterArea"));
	const MasterBarangPage = lazy(() => import("app/pages/Master/MasterBarang"));
	const MasterBisnisUnitPage = lazy(
		() => import("app/pages/Master/MasterBisnisUnit"),
	);
	const MasterDivisiPage = lazy(() => import("app/pages/Master/MasterDivisi"));
	const MasterKodeGroupPage = lazy(
		() => import("app/pages/Master/MasterKodeGroup"),
	);
	const MasterKondisiPage = lazy(
		() => import("app/pages/Master/MasterKondisi"),
	);
	const MasterLokasiPage = lazy(() => import("app/pages/Master/MasterLokasi"));
	const MasterNegaraPage = lazy(() => import("app/pages/Master/MasterNegara"));
	const MasterPegawaiPage = lazy(
		() => import("app/pages/Master/MasterPegawai"),
	);
	const MasterPengelolaPage = lazy(
		() => import("app/pages/Master/MasterPengelola"),
	);
	const MasterPenyediaPage = lazy(
		() => import("app/pages/Master/MasterPenyedia"),
	);
	const MasterSatuanKerjaPage = lazy(
		() => import("app/pages/Master/MasterSatuanKerja"),
	);
	const MasterUserPage = lazy(() => import("app/pages/Master/MasterUser"));
	const MasterWarnaPage = lazy(() => import("app/pages/Master/MasterWarna"));
	const RiwayatTiketLayananPage = lazy(
		() => import("app/pages/RiwayatTiketLayanan"),
	);
	const Pemindahan = lazy(() => import("app/pages/Pemindahan"));
	const LoginPage = lazy(() => import("app/pages/Login"));

	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route index element={<DashboardPage />}></Route>
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="inventaris" element={<HbbInventaryPage />} />
					<Route path="layanan" element={<LayananPage />} />
					<Route path="cetak-barcode" element={<CetakBarcodePage />} />
					<Route
						path="daftar-inventaris-ruangan"
						element={<InventarisRuanganPage />}
					/>
					<Route
						path="laporan-hbb-dan-inventaris"
						element={<LaporanHbbInventarisPage />}
					/>
					<Route
						path="lampiran-hbb-dan-inventaris"
						element={<LampiranHbbInventarisPage />}
					/>
					<Route
						path="laporan-inventaris-koorporat"
						element={<LaporanInventarisKoorporatPage />}
					/>
					<Route
						path="formulir-izin-keluar-dan-masuk-gudang"
						element={<FormulirKeluarMasukGudangPage />}
					/>
					<Route path="master-area" element={<MasterAreaPage />} />
					<Route path="master-barang" element={<MasterBarangPage />} />
					<Route path="master-bisnis-unit" element={<MasterBisnisUnitPage />} />
					<Route path="master-divisi" element={<MasterDivisiPage />} />
					<Route path="master-kode-group" element={<MasterKodeGroupPage />} />
					<Route path="master-kondisi" element={<MasterKondisiPage />} />
					<Route path="master-lokasi" element={<MasterLokasiPage />} />
					<Route path="master-negara" element={<MasterNegaraPage />} />
					<Route path="master-pegawai" element={<MasterPegawaiPage />} />
					<Route path="master-pengelola" element={<MasterPengelolaPage />} />
					<Route path="master-penyedia" element={<MasterPenyediaPage />} />
					<Route
						path="master-satuan-kerja"
						element={<MasterSatuanKerjaPage />}
					/>
					<Route path="master-user" element={<MasterUserPage />} />
					<Route path="master-warna" element={<MasterWarnaPage />} />
					<Route
						path="riwayat-tiket-layanan"
						element={<RiwayatTiketLayananPage />}
					/>
					<Route path="pemindahan" element={<Pemindahan />} />
					<Route path="login" element={<LoginPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
}
