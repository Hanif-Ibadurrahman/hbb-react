import React from "react";

interface IAppAuth {
	children: React.ReactNode;
}

export const AppAuth = ({ children }: IAppAuth) => {
	const token = sessionStorage.getItem("Token");

	const isLoginPage = window.location.pathname === "/login";
	if (!token && !isLoginPage) {
		window.location.href = "/login";
	}

	return <>{children}</>;
};
