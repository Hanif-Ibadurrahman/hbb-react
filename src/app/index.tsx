import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	localStorage.getItem("User");

	const DashboardPage = lazy(() => import("app/pages/Dashboard"));
	const HbbInventaryPage = lazy(() => import("app/pages/HbbInventory"));
	const LayananPage = lazy(() => import("app/pages/Layanan"));
	const CetakBarcodePage = lazy(() => import("app/pages/CetakBarcode"));
	const MasterAreaPage = lazy(() => import("app/pages/Master/MasterArea"));
	const MasterBarangPage = lazy(() => import("app/pages/Master/MasterBarang"));
	const MasterBisnisUnitPage = lazy(
		() => import("app/pages/Master/MasterBisnisUnit"),
	);
	const MasterDivisiPage = lazy(() => import("app/pages/Master/MasterDivisi"));
	const MasterKodeGroupPage = lazy(
		() => import("app/pages/Master/MasterKodeGroup"),
	);
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
					<Route path="master-area" element={<MasterAreaPage />} />
					<Route path="master-barang" element={<MasterBarangPage />} />
					<Route path="master-bisnis-unit" element={<MasterBisnisUnitPage />} />
					<Route path="master-divisi" element={<MasterDivisiPage />} />
					<Route path="master-kode-group" element={<MasterKodeGroupPage />} />
					<Route path="login" element={<LoginPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
}
