import Swal from "sweetalert2";
import { ITokenDecode } from "store/types/loginTypes";
import jwtDecode from "jwt-decode";
import { token } from "../permission";

export const CheckResponse = (error: any) => {
	if (error?.response?.data?.error === "Unauthenticated") {
		document.cookie = `token=;`;
		document.cookie = `laravel_session=;`;
		document.cookie = `XSRF-TOKEN=;`;

		window.location.href = "/login";
		return Swal.fire({
			icon: "error",
			title: "Opps... Authentikasi sudah expire.",
			showConfirmButton: false,
			timer: 3000,
		});
	} else {
		return Swal.fire({
			icon: "error",
			title: error.response?.data?.message,
			showConfirmButton: false,
			timer: 3000,
		});
	}
};

export const TokenDekode = () => {
	if (token) {
		const tokenDecode: ITokenDecode = jwtDecode(token);
		return tokenDecode;
	}
};
