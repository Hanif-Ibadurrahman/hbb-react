import { approveServiceChangeApi } from "api/serviceChange";
import { approveServiceDeleteApi } from "api/serviceDelete";
import { approveServiceInspectionApi } from "api/serviceInspection";
import { approveServiceRepairApi } from "api/serviceRepair";
import { approveServiceReplacementApi } from "api/serviceReplacement";
import { approveServiceRequestApi } from "api/serviceRequest";
import { approveServiceReturnApi } from "api/serviceReturn";
import { CheckResponse } from "app/helper/authentication";
import Swal from "sweetalert2";

export const HandleApprove = (record: any, remark: string) => {
	const swalCustom = Swal.mixin({
		customClass: {
			confirmButton: "btn btn-success m-1",
			cancelButton: "btn btn-danger m-1",
		},
		buttonsStyling: false,
	});

	const swalApprove = () => {
		return swalCustom.fire("Approve", "Data ini telah disetujui.", "success");
	};

	switch (record.transaction_type) {
		case "perubahan":
			approveServiceChangeApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		case "penghapusan":
			approveServiceDeleteApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		case "pemeriksaan":
			approveServiceInspectionApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		case "perbaikan":
			approveServiceRepairApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		case "penggantian":
			approveServiceReplacementApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		case "permintaan":
			approveServiceRequestApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		case "pengembalian":
			approveServiceReturnApi(record.id, { remark: remark })
				.then(res => {
					if (res.data.status === "success") {
						swalApprove();
					} else {
						swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
			break;

		default:
			break;
	}
};
