import { ChatBox } from "app/components/ChatBox";
import { ControlSidebar } from "app/components/ControlSidebar";
import { Footer } from "app/components/Footer";
import { Header } from "app/components/Header";
import { Sidebar } from "app/components/Sidebar";
import { Sticky } from "app/components/Sticky";
import React, { useState } from "react";

interface IFullLayout {
	children: React.ReactNode;
}

export const FullLayout = ({ children }: IFullLayout) => {
	const [selectedMenu, setSelectedMenu] = useState<string>("");

	const collapseHandler = (thisKey: string) => {
		selectedMenu === thisKey
			? setSelectedMenu("")
			: setSelectedMenu("collapse");
	};

	return (
		<div
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

			<Sticky />

			<ChatBox />
		</div>
	);
};
