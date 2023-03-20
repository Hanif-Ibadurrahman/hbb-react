import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	localStorage.getItem("User");

	const DashboardPage = lazy(() => import("app/pages/Dashboard"));
	const HbbInventaryPage = lazy(() => import("app/pages/HbbInventory"));
	const MasterBarangPage = lazy(() => import("app/pages/Master/MasterBarang"));

	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route index element={<DashboardPage />}></Route>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/inventaris" element={<HbbInventaryPage />} />
					<Route path="/master" element={<MasterBarangPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
}
