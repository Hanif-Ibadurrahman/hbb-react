import { ControlSidebar } from "app/components/controlSidebar";
import { Footer } from "app/components/footer";
import { Header } from "app/components/header";
import { Sidebar } from "app/components/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
	const [selectedMenu, setSelectedMenu] = useState<string>("");

	const collapseHandler = (thisKey: string) => {
		selectedMenu === thisKey
			? setSelectedMenu("")
			: setSelectedMenu("collapse");
	};

	return (
		<div
			className={`light-skin sidebar-mini theme-primary fixed ${
				selectedMenu ? "sidebar-collapse sidebar-open" : ""
			}`}
		>
			<div className="wrapper">
				<Header collapseHandler={collapseHandler} />

				<Sidebar />

				<div className="content-wrapper">
					<div className="container-full">
						<Outlet />
					</div>
				</div>

				<Footer />

				<ControlSidebar />

				<div className="control-sidebar-bg"></div>
			</div>
		</div>
	);
};
