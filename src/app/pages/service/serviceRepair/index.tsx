import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { Modal as AntdModal, Button, Form, FormInstance, Input } from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
	IServiceRepairGetAllParams,
	IServiceRepairPaginateResponse,
} from "store/types/serviceRepairTypes";
import {
	createNewServiceRepairApi,
	deleteServiceRepairApi,
	getDetailServiceRepairApi,
	updateServiceRepairApi,
} from "api/serviceRepair";
import { IServiceRepair } from "store/types/serviceRepairTypes";

const ServiceDisplacement = () => {
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [params, setParams] = useState<
		IServiceRepairGetAllParams | undefined
	>();
	const [tempFilter, setTempFilter] = useState<
		IServiceRepairGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [initialValue, setInitialValue] = useState<{
		name_item: string;
		description: string;
	}>();
	const [dataTable, setDataTable] = useState<IServiceRepairPaginateResponse>();

	const fetchDataList = async () => {
		try {
			if (params) {
				// const response = await getAllServiceRepairApi(params);
				// setDataTable(response.data.data);
				let data: IServiceRepair[] = [];
				for (let i = 1; i <= 100; i++) {
					data.push({
						id: `${i}`,
						name_item: `102023 ${i}`,
						condition: "Baik",
						description: "Pinjam",
						photo: "Foto",
						specification: `Spesifikasi ${i}`,
						user: `User ${i}`,
					});
				}
				setDataTable({
					total: 100,
					per_page: 10,
					current_page: 1,
					last_page: 10,
					first_page_url: "",
					last_page_url: "",
					next_page_url: "",
					prev_page_url: "",
					path: "",
					link: [
						{
							url: null,
							label: null,
							active: false,
						},
					],
					from: 1,
					to: 10,
					data: data,
				});
			}
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailServiceRepairApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IServiceRepair) => {
		const setData = {
			name_item: values.name_item || "",
			description: values.description || "",
			photo: values.name_item || "",
			user: values.name_item || "",
			condition: values.name_item || "",
			specification: values.name_item || "",
		};
		// setInitialValue();
		// formRef.current?.setFieldsValue({ name: values.name || "" });
	};

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		setParams({
			...params,
			page: selectedPage.page,
			page_size: selectedPage.pageSize,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPage]);

	useEffect(() => {
		if (showModal.show && showModal.id) {
			fetchDataDetail(showModal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const handleAdd = () => {
		setShowModal({ show: true });
		// setInitialValue({ name: "" });
		formRef.current?.resetFields();
	};

	const handleDelete = (id: string) => {
		const swalCustom = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success m-1",
				cancelButton: "btn btn-danger m-1",
			},
			buttonsStyling: false,
		});

		swalCustom
			.fire({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Delete",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					deleteServiceRepairApi(id).then(res => {
						if (res.data.status === "success") {
							swalCustom.fire(
								"Reject",
								"Permintaan ini talah direject.",
								"success",
							);
							fetchDataList();
						} else {
							swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
						}
					});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Permintaan ini batal direject", "error");
				}
			});
	};

	const onFinish = (values: any) => {
		if (showModal.id) {
			updateServiceRepairApi(showModal.id, values).then(res => {
				if (res.data.status === "success") {
					setShowModal({ show: false });
					fetchDataList();
				}
				Swal.fire({
					icon: res.data.status,
					title: res.data.message,
					showConfirmButton: false,
					timer: 3000,
				});
			});
		} else {
			createNewServiceRepairApi(values).then(res => {
				if (res.data.status === "success") {
					setShowModal({ show: false });
					fetchDataList();
				}
				Swal.fire({
					icon: res.data.status,
					title: res.data.message,
					showConfirmButton: false,
					timer: 3000,
				});
			});
		}
	};

	const handleCancel = () => {
		setShowModal({ show: false });
	};

	const setValueFilter = () => {
		setParams({ ...params, ...tempFilter });
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Permintaan Layanan - Perbaikan"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleAdd}
								>
									Tambah
								</button>
							}
						/>
					</div>
				</div>
			</section>

			<SideModal
				title="Filter"
				contentFooter={
					<button
						type="button"
						className="btn btn-primary"
						data-bs-dismiss="modal"
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Nama Area</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Daerah</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Pengelola</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">NIPG</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Pemegang</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default ServiceDisplacement;
