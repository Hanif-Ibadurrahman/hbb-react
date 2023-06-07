import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard/dashboardPage";
import { CorporateInventoryReportPage } from "./pages/corporateInventoryReport/corporateInventoryReportPage";
// import { DisplacementPage } from "./pages/displacement/displacementPage";
import { HbbInventoryPage } from "./pages/hbbInventory/hbbInventoryPage";
import { HbbInventarisAttachmentPage } from "./pages/hbbInventoryAttachment/hbbInventoryAttachmentPage";
import { HbbInventoryReportPage } from "./pages/hbbInventoryReport/hbbInventoryReportPage";
import { LoginPage } from "./pages/login/loginPage";
// import { PrintBarcodePage } from "./pages/printBarcode/printBarcodePage";
import { RoomInventoryPage } from "./pages/roomInventory/roomInventoryPage";
import { ServiceTicketHistoryPage } from "./pages/serviceTicketHistory/serviceTicketHistoryPage";
// import { WarehouseCheckInOutPage } from "./pages/warehouseCheckInOut/warehouseCheckinOutPage";
import { MasterAreaPage } from "./pages/master/masterArea/masterAreaPage";
import { MasterBusinessUnitPage } from "./pages/master/masterBusinessUnit/masterBusinessUnitPage";
import { MasterCodeGroupPage } from "./pages/master/masterCodeGroup/masterCodeGroupPage";
import { MasterColorPage } from "./pages/master/masterColor/masterColorPage";
import { MasterCompanyPage } from "./pages/master/masterCompany/masterCompanyPage";
import { MasterConditionPage } from "./pages/master/masterCondition/masterConditionPage";
import { MasterCountryPage } from "./pages/master/masterCountry/masterCountryPage";
import { MasterDivisionPage } from "./pages/master/masterDivision/masterDivisionPage";
import { MasterEmployeePage } from "./pages/master/masterEmployee/masterEmployeePage";
import { MasterItemPage } from "./pages/master/masterItem/masterItemPage";
import { MasterLocationPage } from "./pages/master/masterLocation/masterLocationPage";
import { MasterManagerPage } from "./pages/master/masterManager/masterManagerPage";
import { MasterProviderPage } from "./pages/master/masterProvider/masterProviderPage";
import { MasterSubCodeGroupPage } from "./pages/master/masterSubCodeGroup/masterSubCodeGroupPage";
import { MasterWorkUnitPage } from "./pages/master/masterWorkUnit/masterWorkUnitPage";
import { MasterUserPage } from "./pages/master/masterUser/masterUserPage";
// import { ServiceDisplacementPage } from "./pages/service/serviceDisplacement/serviceDisplacemenetPage";
import { ServiceRequestPage } from "./pages/service/serviceRequest/serviceRequestPage";
import { ServiceRepairPage } from "./pages/service/serviceRepair/serviceRepairPage";
import { ServiceReturnPage } from "./pages/service/serviceReturn/serviceReturnPage";
import { ServiceReplacementPage } from "./pages/service/serviceReplacement/serviceReplacementPage";
import { ServiceChangePage } from "./pages/service/serviceChange/serviceChangePage";
import { ServiceInspectionPage } from "./pages/service/serviceInspection/serviceInspectionPage";
import { ServiceDeletePage } from "./pages/service/serviceDelete/serviceDeletePage";
import { MasterWorkflowPage } from "./pages/master/masterWorkflow/masterWorkflowPage";
import { MainLayout } from "./layout/mainLayout";
import "./app.css";

export function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="inventaris" element={<HbbInventoryPage />} />
					<Route path="permintaan-layanan" element={<ServiceRequestPage />} />
					<Route path="permintaan-perbaikan" element={<ServiceRepairPage />} />
					{/* <Route
						path="permintaan-pemindahan"
						element={<ServiceDisplacementPage />}
					/> */}
					<Route
						path="permintaan-pengembalian"
						element={<ServiceReturnPage />}
					/>
					<Route
						path="permintaan-penggantian"
						element={<ServiceReplacementPage />}
					/>
					<Route path="permintaan-perubahan" element={<ServiceChangePage />} />
					<Route
						path="permintaan-pemeriksaan"
						element={<ServiceInspectionPage />}
					/>
					<Route
						path="permintaan-penghapusan"
						element={<ServiceDeletePage />}
					/>
					{/* <Route path="cetak-barcode" element={<PrintBarcodePage />} /> */}
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
					{/* <Route
						path="formulir-izin-keluar-dan-masuk-gudang"
						element={<WarehouseCheckInOutPage />}
					/> */}
					<Route path="master-area" element={<MasterAreaPage />} />
					<Route path="master-barang" element={<MasterItemPage />} />
					<Route
						path="master-bisnis-unit"
						element={<MasterBusinessUnitPage />}
					/>
					<Route path="master-divisi" element={<MasterDivisionPage />} />
					<Route path="master-kode-group" element={<MasterCodeGroupPage />} />
					<Route
						path="master-sub-main-group"
						element={<MasterSubCodeGroupPage />}
					/>
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
					<Route path="master-workflow" element={<MasterWorkflowPage />} />
					<Route
						path="riwayat-tiket-layanan"
						element={<ServiceTicketHistoryPage />}
					/>
					{/* <Route path="pemindahan" element={<DisplacementPage />} /> */}
				</Route>
				<Route path="login" element={<LoginPage />} />
			</Routes>
		</Router>
	);
}
