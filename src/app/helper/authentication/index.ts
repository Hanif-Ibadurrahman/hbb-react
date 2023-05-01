import Swal from "sweetalert2";
import { ITokenDecode } from "store/types/loginTypes";
import jwtDecode from "jwt-decode";

export const CheckAuthentication = (error: any) => {
	if (error.response.data.error === "Unauthenticated") {
		sessionStorage.clear();
		return Swal.fire({
			icon: "error",
			title: "Opps... Authentikasi sudah expire.",
			showConfirmButton: false,
			timer: 3000,
		});
	}
};

export const TokenDekode = () => {
	const token = sessionStorage?.getItem("Token");
	if (token) {
		const tokenDecode: ITokenDecode = jwtDecode(token);
		return tokenDecode;
	}
};
