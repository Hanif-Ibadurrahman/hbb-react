import { Dispatch, SetStateAction } from "react";
import {
	approveServiceChangeApi,
	rejectServiceChangeApi,
} from "api/serviceChange";
import {
	approveServiceDeleteApi,
	rejectServiceDeleteApi,
} from "api/serviceDelete";
import {
	approveServiceInspectionApi,
	rejectServiceInspectionApi,
} from "api/serviceInspection";
import {
	approveServiceRepairApi,
	rejectServiceRepairApi,
} from "api/serviceRepair";
import {
	approveServiceReplacementApi,
	getAllServiceReplacementApi,
	rejectServiceReplacementApi,
} from "api/serviceReplacement";
import {
	approveServiceRequestApi,
	rejectServiceRequestApi,
} from "api/serviceRequest";
import {
	approveServiceReturnApi,
	rejectServiceReturnApi,
} from "api/serviceReturn";
import { CheckResponse } from "app/helper/authentication";
import { Modal as AntdModal, Table, Typography } from "antd";
import { columns } from "../table/columnAndDataType";
import Swal from "sweetalert2";
import { isAdminArea } from "app/helper/permission";
interface IModalTask {
	dataTable: any;
	isShowModal: boolean;
	updateDataList: () => void;
	setDataForm: Dispatch<SetStateAction<any>>;
	setIsShowModal: Dispatch<SetStateAction<boolean>>;
	setShowModalForm: Dispatch<SetStateAction<boolean>>;
}

const ModalTask = ({
	dataTable,
	isShowModal,
	updateDataList,
	setDataForm,
	setIsShowModal,
	setShowModalForm,
}: IModalTask) => {
	const { Title } = Typography;

	const fetchAndSetData = async record => {
		try {
			const response = await getAllServiceReplacementApi();
			const transactionList = response.data.data.data;

			const dataForm = transactionList.find(data => data.id === record.id);
			setDataForm(dataForm);
			setShowModalForm(true);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

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

	const swalReject = () => {
		return swalCustom.fire(
			"Reject",
			"Permintaan ini telah direject.",
			"success",
		);
	};

	const swalError = () => {
		return swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
	};

	const getApproveApiFunction = transactionType => {
		const apiFunctions = {
			perubahan: approveServiceChangeApi,
			penghapusan: approveServiceDeleteApi,
			pemeriksaan: approveServiceInspectionApi,
			perbaikan: approveServiceRepairApi,
			penggantian: approveServiceReplacementApi,
			permintaan: approveServiceRequestApi,
			pengembalian: approveServiceReturnApi,
		};

		return apiFunctions[transactionType];
	};

	const handleApprove = async record => {
		if (
			isAdminArea &&
			(record.transaction_type === "penggantian" ||
				record.transaction_type === "penghapusan" ||
				record.transaction_type === "pengembalian")
		) {
			fetchAndSetData(record);
		} else {
			const result = await swalCustom.fire({
				title: "Apakah anda yakin ingin menyetujui permintaan ini?",
				text: "Ada catatan?",
				input: "text",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Approve",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			});

			if (result.isConfirmed) {
				try {
					const apiFunc = getApproveApiFunction(record.transaction_type);
					const res = await apiFunc(record.id, {
						remark: result.value,
					});

					if (res.data.status === "success") {
						swalApprove();
						updateDataList();
					} else {
						swalError();
					}
				} catch (error) {
					CheckResponse(error);
				}
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				swalCustom.fire("Batal", "Permintaan ini batal disetujui", "error");
			}
		}
	};

	const getRejectApiFunction = transactionType => {
		const apiFunctions = {
			perubahan: rejectServiceChangeApi,
			penghapusan: rejectServiceDeleteApi,
			pemeriksaan: rejectServiceInspectionApi,
			perbaikan: rejectServiceRepairApi,
			penggantian: rejectServiceReplacementApi,
			permintaan: rejectServiceRequestApi,
			pengembalian: rejectServiceReturnApi,
		};

		return apiFunctions[transactionType];
	};

	const handleReject = async record => {
		const result = await swalCustom.fire({
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
		});

		if (result.isConfirmed) {
			try {
				const apiFunc = getRejectApiFunction(record.transaction_type);
				const res = await apiFunc(record.id, {
					remark: result.value,
				});

				if (res.data.status === "success") {
					swalReject();
					updateDataList();
				} else {
					swalError();
				}
			} catch (error) {
				CheckResponse(error);
			}
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			swalCustom.fire("Batal", "Permintaan ini batal direject", "error");
		}
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
