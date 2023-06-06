import React from "react";
interface IAppAuth {
	children: React.ReactNode;
}

export const AppAuth = ({ children }: IAppAuth) => {
	const cookies = document.cookie.split(";");
	const tokenCookie = cookies.find(cookie =>
		cookie.trim().startsWith("token="),
	);
	const token = tokenCookie?.slice(7);

	const isLoginPage = window.location.pathname === "/login";
	if (!token && !isLoginPage) {
		window.location.href = "/login";
	}

	return <>{children}</>;
};
