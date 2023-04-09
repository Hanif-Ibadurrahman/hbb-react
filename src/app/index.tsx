import { lazyLoad } from "utils/loadable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	const DashboardPage = lazyLoad(() => import("app/pages/dashboard"));
	const HbbInventaryPage = lazyLoad(() => import("app/pages/hbbInventory"));
	const ServicePage = lazyLoad(() => import("app/pages/service"));
	const PrintBarcodePage = lazyLoad(() => import("app/pages/printBarcode"));
	const RoomInventoryPage = lazyLoad(() => import("app/pages/roomInventory"));
	const HbbInventoryReportPage = lazyLoad(
		() => import("app/pages/hbbInventoryReport"),
	);
	const HbbInventarisAttachmentPage = lazyLoad(
		() => import("app/pages/hbbInventoryAttachment"),
	);
	const CorporateInventoryReportPage = lazyLoad(
		() => import("app/pages/corporateInventoryReport"),
	);
	const WarehouseCheckInOutPage = lazyLoad(
		() => import("app/pages/warehouseCheckInOut"),
	);
	const MasterAreaPage = lazyLoad(() => import("app/pages/master/masterArea"));
	const MasterItemPage = lazyLoad(() => import("app/pages/master/masterItem"));
	const MasterBusinessUnitPage = lazyLoad(
		() => import("app/pages/master/masterBusinessUnit"),
	);
	const MasterDivisionPage = lazyLoad(
		() => import("app/pages/master/masterDivision"),
	);
	const MasterCodeGroupPage = lazyLoad(
		() => import("app/pages/master/masterCodeGroup"),
	);
	const MasterConditionPage = lazyLoad(
		() => import("app/pages/master/masterCondition"),
	);
	const MasterLocationPage = lazyLoad(
		() => import("app/pages/master/masterLocation"),
	);
	const MasterCountryPage = lazyLoad(
		() => import("app/pages/master/masterCountry"),
	);
	const MasterEmployeePage = lazyLoad(
		() => import("app/pages/master/masterEmployee"),
	);
	const MasterManagerPage = lazyLoad(
		() => import("app/pages/master/masterManager"),
	);
	const MasterProviderPage = lazyLoad(
		() => import("app/pages/master/masterProvider"),
	);
	const MasterCompanyPage = lazyLoad(
		() => import("app/pages/master/masterCompany"),
	);
	const MasterWorkUnitPage = lazyLoad(
		() => import("app/pages/master/masterWorkUnit"),
	);
	const MasterUserPage = lazyLoad(() => import("app/pages/master/masterUser"));
	const MasterColorPage = lazyLoad(
		() => import("app/pages/master/masterColor"),
	);
	const ServiceTicketHistoryPage = lazyLoad(
		() => import("app/pages/serviceTicketHistory"),
	);
	const Displacement = lazyLoad(() => import("app/pages/displacement"));
	const LoginPage = lazyLoad(() => import("app/pages/login"));

	return (
		<Router>
			<Routes>
				<Route index element={<DashboardPage />}></Route>
				<Route path="dashboard" element={<DashboardPage />} />
				<Route path="inventaris" element={<HbbInventaryPage />} />
				<Route path="layanan" element={<ServicePage />} />
				<Route path="cetak-barcode" element={<PrintBarcodePage />} />
				<Route
					path="daftar-inventaris-ruangan"
					element={<RoomInventoryPage />}
				/>
				<Route
					path="laporan-hbb-dan-inventaris"
					element={<HbbInventoryReportPage />}
				/>
				<Route
					path="lampiran-hbb-dan-inventaris"
					element={<HbbInventarisAttachmentPage />}
				/>
				<Route
					path="laporan-inventaris-koorporat"
					element={<CorporateInventoryReportPage />}
				/>
				<Route
					path="formulir-izin-keluar-dan-masuk-gudang"
					element={<WarehouseCheckInOutPage />}
				/>
				<Route path="master-area" element={<MasterAreaPage />} />
				<Route path="master-barang" element={<MasterItemPage />} />
				<Route path="master-bisnis-unit" element={<MasterBusinessUnitPage />} />
				<Route path="master-divisi" element={<MasterDivisionPage />} />
				<Route path="master-kode-group" element={<MasterCodeGroupPage />} />
				<Route path="master-kondisi" element={<MasterConditionPage />} />
				<Route path="master-lokasi" element={<MasterLocationPage />} />
				<Route path="master-negara" element={<MasterCountryPage />} />
				<Route path="master-pegawai" element={<MasterEmployeePage />} />
				<Route path="master-pengelola" element={<MasterManagerPage />} />
				<Route path="master-penyedia" element={<MasterProviderPage />} />
				<Route path="master-perusahaan" element={<MasterCompanyPage />} />
				<Route path="master-satuan-kerja" element={<MasterWorkUnitPage />} />
				<Route path="master-user" element={<MasterUserPage />} />
				<Route path="master-warna" element={<MasterColorPage />} />
				<Route
					path="riwayat-tiket-layanan"
					element={<ServiceTicketHistoryPage />}
				/>
				<Route path="pemindahan" element={<Displacement />} />
				<Route path="login" element={<LoginPage />} />
			</Routes>
		</Router>
	);
}
