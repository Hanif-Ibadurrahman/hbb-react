import Swal from "sweetalert2";
import { ITokenDecode } from "store/types/loginTypes";
import jwtDecode from "jwt-decode";
import { token } from "../permission";

export const CheckResponse = (error: any) => {
	if (error?.response?.data?.error === "Unauthenticated") {
		sessionStorage.clear();

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
	}

	if (error?.response?.statusText === "Unprocessable Entity") {
		return Swal.fire({
			icon: "error",
			title: Object.values(error.response?.data)
				.flatMap(value => value)
				.join(", "),
			showConfirmButton: false,
			timer: 3000,
		});
	}

	return Swal.fire({
		icon: "error",
		title: error.response?.data?.message,
		showConfirmButton: false,
		timer: 3000,
	});
};

export const TokenDekode = () => {
	if (token) {
		const tokenDecode: ITokenDecode = jwtDecode(token);
		return tokenDecode;
	}
};
