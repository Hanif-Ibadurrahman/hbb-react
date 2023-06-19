import { rejectServiceChangeApi } from "api/serviceChange";
import { rejectServiceDeleteApi } from "api/serviceDelete";
import { rejectServiceInspectionApi } from "api/serviceInspection";
import { rejectServiceRepairApi } from "api/serviceRepair";
import { rejectServiceReplacementApi } from "api/serviceReplacement";
import { rejectServiceRequestApi } from "api/serviceRequest";
import { rejectServiceReturnApi } from "api/serviceReturn";
import { CheckResponse } from "app/helper/authentication";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const HandleReject = (record: any, remark: string) => {
	const navigate = useNavigate();

	const swalCustom = Swal.mixin({
		customClass: {
			confirmButton: "btn btn-success m-1",
			cancelButton: "btn btn-danger m-1",
		},
		buttonsStyling: false,
	});

	const swalReject = () => {
		return swalCustom.fire(
			"Reject",
			"Permintaan ini telah direject.",
			"success",
		);
	};

	switch (record.transaction_type) {
		case "perubahan":
			return rejectServiceChangeApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", {
							replace: true,
						});
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
		case "penghapusan":
			return rejectServiceDeleteApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", { replace: true });
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});

		case "pemeriksaan":
			return rejectServiceInspectionApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", { replace: true });
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});

		case "perbaikan":
			return rejectServiceRepairApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", { replace: true });
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});

		case "penggantian":
			return rejectServiceReplacementApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", { replace: true });
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});

		case "permintaan":
			return rejectServiceRequestApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", { replace: true });
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});

		case "pengembalian":
			return rejectServiceReturnApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalReject();
						navigate("/riwayat-tiket-layanan", { replace: true });
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});

		default:
			break;
	}
};
