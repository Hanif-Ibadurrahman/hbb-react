import { Dispatch, SetStateAction } from "react";
import { rejectServiceChangeApi } from "api/serviceChange";
import { rejectServiceDeleteApi } from "api/serviceDelete";
import { rejectServiceInspectionApi } from "api/serviceInspection";
import { rejectServiceRepairApi } from "api/serviceRepair";
import { rejectServiceReplacementApi } from "api/serviceReplacement";
import { rejectServiceRequestApi } from "api/serviceRequest";
import { rejectServiceReturnApi } from "api/serviceReturn";
import { CheckResponse } from "app/helper/authentication";
import { Modal as AntdModal, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { columns } from "../table/columnAndDataType";
import Swal from "sweetalert2";
// import { HandleReject } from "./handleReject";
interface IModalTask {
	dataTable: any;
	isShowModal: boolean;
	setIsShowModal: Dispatch<SetStateAction<boolean>>;
	setShowModalForm: Dispatch<SetStateAction<boolean>>;
}

const ModalTask = ({ dataTable, isShowModal, setIsShowModal }: IModalTask) => {
	const { Title } = Typography;
	const navigate = useNavigate();

	const handleApprove = record => {};

	const handleReject = record => {
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

		swalCustom
			.fire({
				title: "Apakah anda yakin ingin menolak permintaan ini?",
				text: "Alasan penolakan",
				input: "text",
				inputAttributes: {
					required: "true",
				},
				validationMessage: "Harap isi alasan penolakan",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Reject",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					// HandleReject(record, result.value);
					switch (record.transaction_type) {
						case "perubahan":
							return rejectServiceChangeApi(record.id, { remark: result.value })
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", {
											replace: true,
										});
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});
						case "penghapusan":
							return rejectServiceDeleteApi(record.id, { remark: result.value })
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", { replace: true });
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});

						case "pemeriksaan":
							return rejectServiceInspectionApi(record.id, {
								remark: result.value,
							})
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", { replace: true });
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});

						case "perbaikan":
							return rejectServiceRepairApi(record.id, { remark: result.value })
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", { replace: true });
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});

						case "penggantian":
							return rejectServiceReplacementApi(record.id, {
								remark: result.value,
							})
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", { replace: true });
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});

						case "permintaan":
							return rejectServiceRequestApi(record.id, {
								remark: result.value,
							})
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", { replace: true });
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});

						case "pengembalian":
							return rejectServiceReturnApi(record.id, { remark: result.value })
								.then(res => {
									if (res.data.status === "success") {
										swalReject();
										navigate("/riwayat-tiket-layanan", { replace: true });
									} else {
										swalCustom.fire(
											"Error",
											"Telah terjadi kesalahan",
											"error",
										);
									}
								})
								.catch((error: any) => {
									CheckResponse(error);
								});

						default:
							break;
					}
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Permintaan ini batal direject", "error");
				}
			});
	};

	return (
		<AntdModal
			title={<Title level={3}>Task Approval</Title>}
			onCancel={() => setIsShowModal(false)}
			footer
			open={isShowModal}
			width={850}
			destroyOnClose
		>
			<Table
				columns={columns({ handleApprove, handleReject })}
				dataSource={dataTable}
				pagination={false}
				scroll={{ x: 850 }}
			/>
		</AntdModal>
	);
};

export default ModalTask;
