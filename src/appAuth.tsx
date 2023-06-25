import jwtDecode from "jwt-decode";
import React, { useRef } from "react";
import { ITokenDecode } from "store/types/loginTypes";
interface IAppAuth {
	children: React.ReactNode;
}

export const AppAuth = ({ children }: IAppAuth) => {
	const cookies = document.cookie.split(";");
	const tokenCookie = cookies.find(cookie =>
		cookie.trim().startsWith("token="),
	);
	const checkToken = tokenCookie?.slice(7);

	const isLoginPage = window.location.pathname === "/login";
	const tokenSession = sessionStorage.getItem("token");
	const redirectLogin = useRef(false);

	if (!checkToken) {
		if (tokenSession === null) {
			if (!tokenSession && !isLoginPage && !redirectLogin.current) {
				redirectLogin.current = true;
				window.location.href = "/login";
			}
		} else {
			const dataDecode: ITokenDecode = jwtDecode(tokenSession);
			document.cookie = `token=${tokenSession}; max-age=${dataDecode.expires_in}; SameSite=lax; Secure`;
		}
	}

	return <>{children}</>;
};
