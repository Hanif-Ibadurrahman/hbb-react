import { ControlSidebar } from "app/components/ControlSidebar";
import { Footer } from "app/components/Footer";
import { Header } from "app/components/Header";
import { Sidebar } from "app/components/Sidebar";
import React, { useState } from "react";

interface IMainLayout {
	children: React.ReactNode;
}

export const MainLayout = ({ children }: IMainLayout) => {
	const [selectedMenu, setSelectedMenu] = useState<string>("");

	const collapseHandler = (thisKey: string) => {
		selectedMenu === thisKey
			? setSelectedMenu("")
			: setSelectedMenu("collapse");
	};

	return (
		<body
			className={`light-skin sidebar-mini theme-primary fixed ${
				selectedMenu ? "sidebar-collapse" : ""
			}`}
		>
			<div className="wrapper">
				<Header collapseHandler={collapseHandler} />

				<Sidebar />

				<div className="content-wrapper">
					<div className="container-full">{children}</div>
				</div>

				<Footer />

				<ControlSidebar />

				<div className="control-sidebar-bg"></div>
			</div>
		</body>
	);
};
