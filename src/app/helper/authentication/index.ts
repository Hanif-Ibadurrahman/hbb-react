import Swal from "sweetalert2";

export const CheckAuthentication = (error: any) => {
	if (error.response.data.error === "Unauthenticated") {
		// sessionStorage.clear();
		return Swal.fire({
			icon: "error",
			title: "Opps... Authentikasi sudah expire.",
			showConfirmButton: false,
			timer: 3000,
		});
	}
};
