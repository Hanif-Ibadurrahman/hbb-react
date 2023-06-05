import { token } from "app/helper/permission";
import React from "react";
interface IAppAuth {
	children: React.ReactNode;
}

export const AppAuth = ({ children }: IAppAuth) => {
	const isLoginPage = window.location.pathname === "/login";
	if (!token && !isLoginPage) {
		window.location.href = "/login";
	}

	return <>{children}</>;
};
