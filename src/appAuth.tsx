import jwtDecode from "jwt-decode";
import React, { useRef } from "react";
import { ITokenDecode } from "store/types/loginTypes";
interface IAppAuth {
	children: React.ReactNode;
}

export const AppAuth = ({ children }: IAppAuth) => {
	const tokenCookie = document.cookie
		.split(";")
		.find(cookie => cookie.trim().startsWith("token="));
	const checkToken = tokenCookie?.slice(7);

	const isLoginPage = window.location.pathname === "/login";
	const tokenSession = sessionStorage.getItem("token");
	const redirectLogin = useRef(false);

	if (checkToken === "" && tokenSession !== null) {
		const dataDecode: ITokenDecode = jwtDecode(tokenSession);
		document.cookie = `token=${tokenSession}; max-age=${dataDecode.expires_in}; SameSite=lax; Secure`;
		window.location.reload();
	}

	if (
		checkToken === "" &&
		tokenSession === null &&
		!isLoginPage &&
		!redirectLogin.current
	) {
		redirectLogin.current = true;
		window.location.href = "/login";
	}

	return <>{children}</>;
};
