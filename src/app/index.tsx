import { lazyLoad } from "utils/loadable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	const DashboardPage = lazyLoad(() => import("app/pages/dashboard"));
	const HbbInventaryPage = lazyLoad(() => import("app/pages/hbbInventory"));
	const LayananPage = lazyLoad(() => import("app/pages/layanan"));
	const CetakBarcodePage = lazyLoad(() => import("app/pages/cetakBarcode"));
	const InventarisRuanganPage = lazyLoad(
		() => import("app/pages/inventarisRuangan"),
	);
	const LaporanHbbInventarisPage = lazyLoad(
		() => import("app/pages/laporanHbbInventory"),
	);
	const LampiranHbbInventarisPage = lazyLoad(
		() => import("app/pages/lampiranHbbInventory"),
	);
	const LaporanInventarisKoorporatPage = lazyLoad(
		() => import("app/pages/laporanInventarisKoorporat"),
	);
	const FormulirKeluarMasukGudangPage = lazyLoad(
		() => import("app/pages/formulirKeluarMasukGudang"),
	);
	const MasterAreaPage = lazyLoad(() => import("app/pages/master/masterArea"));
	const MasterBarangPage = lazyLoad(
		() => import("app/pages/master/masterBarang"),
	);
	const MasterBisnisUnitPage = lazyLoad(
		() => import("app/pages/master/masterBisnisUnit"),
	);
	const MasterDivisiPage = lazyLoad(
		() => import("app/pages/master/masterDivisi"),
	);
	const MasterKodeGroupPage = lazyLoad(
		() => import("app/pages/master/masterKodeGroup"),
	);
	const MasterKondisiPage = lazyLoad(
		() => import("app/pages/master/masterKondisi"),
	);
	const MasterLokasiPage = lazyLoad(
		() => import("app/pages/master/masterLokasi"),
	);
	const MasterNegaraPage = lazyLoad(
		() => import("app/pages/master/masterNegara"),
	);
	const MasterPegawaiPage = lazyLoad(
		() => import("app/pages/master/masterPegawai"),
	);
	const MasterPengelolaPage = lazyLoad(
		() => import("app/pages/master/masterPengelola"),
	);
	const MasterPenyediaPage = lazyLoad(
		() => import("app/pages/master/masterPenyedia"),
	);
	const MasterPerusahaanPage = lazyLoad(
		() => import("app/pages/master/masterPerusahaan"),
	);
	const MasterSatuanKerjaPage = lazyLoad(
		() => import("app/pages/master/masterSatuanKerja"),
	);
	const MasterUserPage = lazyLoad(() => import("app/pages/master/masterUser"));
	const MasterWarnaPage = lazyLoad(
		() => import("app/pages/master/masterWarna"),
	);
	const RiwayatTiketLayananPage = lazyLoad(
		() => import("app/pages/riwayatTiketLayanan"),
	);
	const Pemindahan = lazyLoad(() => import("app/pages/pemindahan"));
	const LoginPage = lazyLoad(() => import("app/pages/login"));

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
