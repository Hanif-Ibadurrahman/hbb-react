import { lazyLoad } from "utils/loadable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	const DashboardPage = lazyLoad(() => import("app/pages/Dashboard"));
	const HbbInventaryPage = lazyLoad(() => import("app/pages/HbbInventory"));
	const LayananPage = lazyLoad(() => import("app/pages/Layanan"));
	const CetakBarcodePage = lazyLoad(() => import("app/pages/CetakBarcode"));
	const InventarisRuanganPage = lazyLoad(
		() => import("app/pages/InventarisRuangan"),
	);
	const LaporanHbbInventarisPage = lazyLoad(
		() => import("app/pages/LaporanHbbInventory"),
	);
	const LampiranHbbInventarisPage = lazyLoad(
		() => import("app/pages/LampiranHbbInventory"),
	);
	const LaporanInventarisKoorporatPage = lazyLoad(
		() => import("app/pages/LaporanInventarisKoorporat"),
	);
	const FormulirKeluarMasukGudangPage = lazyLoad(
		() => import("app/pages/FormulirKeluarMasukGudang"),
	);
	const MasterAreaPage = lazyLoad(() => import("app/pages/Master/MasterArea"));
	const MasterBarangPage = lazyLoad(
		() => import("app/pages/Master/MasterBarang"),
	);
	const MasterBisnisUnitPage = lazyLoad(
		() => import("app/pages/Master/MasterBisnisUnit"),
	);
	const MasterDivisiPage = lazyLoad(
		() => import("app/pages/Master/MasterDivisi"),
	);
	const MasterKodeGroupPage = lazyLoad(
		() => import("app/pages/Master/MasterKodeGroup"),
	);
	const MasterKondisiPage = lazyLoad(
		() => import("app/pages/Master/MasterKondisi"),
	);
	const MasterLokasiPage = lazyLoad(
		() => import("app/pages/Master/MasterLokasi"),
	);
	const MasterNegaraPage = lazyLoad(
		() => import("app/pages/Master/MasterNegara"),
	);
	const MasterPegawaiPage = lazyLoad(
		() => import("app/pages/Master/MasterPegawai"),
	);
	const MasterPengelolaPage = lazyLoad(
		() => import("app/pages/Master/MasterPengelola"),
	);
	const MasterPenyediaPage = lazyLoad(
		() => import("app/pages/Master/MasterPenyedia"),
	);
	const MasterPerusahaanPage = lazyLoad(
		() => import("app/pages/Master/MasterPerusahaan"),
	);
	const MasterSatuanKerjaPage = lazyLoad(
		() => import("app/pages/Master/MasterSatuanKerja"),
	);
	const MasterUserPage = lazyLoad(() => import("app/pages/Master/MasterUser"));
	const MasterWarnaPage = lazyLoad(
		() => import("app/pages/Master/MasterWarna"),
	);
	const RiwayatTiketLayananPage = lazyLoad(
		() => import("app/pages/RiwayatTiketLayanan"),
	);
	const Pemindahan = lazyLoad(() => import("app/pages/Pemindahan"));
	const LoginPage = lazyLoad(() => import("app/pages/Login"));

	return (
		<Router>
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
				<Route path="master-perusahaan" element={<MasterPerusahaanPage />} />
				<Route path="master-satuan-kerja" element={<MasterSatuanKerjaPage />} />
				<Route path="master-user" element={<MasterUserPage />} />
				<Route path="master-warna" element={<MasterWarnaPage />} />
				<Route
					path="riwayat-tiket-layanan"
					element={<RiwayatTiketLayananPage />}
				/>
				<Route path="pemindahan" element={<Pemindahan />} />
				<Route path="login" element={<LoginPage />} />
			</Routes>
		</Router>
	);
}
