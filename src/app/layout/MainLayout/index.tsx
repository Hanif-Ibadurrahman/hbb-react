import { ChatBox } from "app/components/ChatBox";
import { ControlSidebar } from "app/components/ControlSidebar";
import { Footer } from "app/components/Footer";
import { Header } from "app/components/Header";
import { Sidebar } from "app/components/Sidebar";
import { Sticky } from "app/components/Sticky";
import React from "react";

interface IMainLayout {
	children: React.ReactNode;
}

export const MainLayout = ({ children }: IMainLayout) => {
	return (
		<body className="hold-transition light-skin sidebar-mini theme-primary fixed">
			<div className="wrapper">
				<Header />

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
