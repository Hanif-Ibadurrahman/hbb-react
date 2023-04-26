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
	ICreateServiceDeleteRequest,
	IServiceDeleteGetAllParams,
	IServiceDeletePaginateResponse,
} from "store/types/serviceDeleteTypes";
import {
	createNewServiceDeleteApi,
	deleteServiceDeleteApi,
	getDetailServiceDeleteApi,
	updateServiceDeleteApi,
} from "api/serviceDelete";
import { IServiceDelete } from "store/types/serviceDeleteTypes";

const ServiceDelete = () => {
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [params, setParams] = useState<
		IServiceDeleteGetAllParams | undefined
	>();
	const [tempFilter, setTempFilter] = useState<
		IServiceDeleteGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [initialValue, setInitialValue] =
		useState<ICreateServiceDeleteRequest>();
	const [dataTable, setDataTable] = useState<IServiceDeletePaginateResponse>();

	const fetchDataList = async () => {
		try {
			if (params) {
				// const response = await getAllServiceDeleteApi(params);
				// setDataTable(response.data.data);
				let data: IServiceDelete[] = [];
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
			const response = await getDetailServiceDeleteApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IServiceDelete) => {
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
			...selectedPageAndSort,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPageAndSort]);

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

	const handleApprove = (id: string) => {};

	const handleAdd = () => {
		setShowModal({ show: true });
		setInitialValue({
			name_item: "",
			description: "",
			condition: "",
			user: "",
			specification: "",
			photo: "",
		});
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
				title: "Apakah anda yakin ingin menolak permintaan ini?",
				text: "Alasan penolakan",
				input: "text",
				icon: "warning",
				preConfirm: input => {
					console.log(input);
				},
				showCancelButton: true,
				confirmButtonText: "Reject",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					deleteServiceDeleteApi(id).then(res => {
						if (res.data.status === "success") {
							swalCustom.fire(
								"Reject",
								"Permintaan ini telah direject.",
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
			updateServiceDeleteApi(showModal.id, values).then(res => {
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
			createNewServiceDeleteApi(values).then(res => {
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
							title="Permintaan Layanan - Penghapusan"
							dataSource={dataTable}
							columns={columns({ handleApprove, handleDelete })}
							setSelectedPageAndSort={setSelectedPageAndSort}
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

			<AntdModal
				title={showModal.show && showModal.id ? "Edit Data" : "Tambah Data"}
				footer={
					<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
						<Button type="primary" danger onClick={handleCancel}>
							Close
						</Button>
						<Button type="primary" onClick={form.submit}>
							Simpan
						</Button>
					</div>
				}
				onCancel={handleCancel}
				open={showModal.show}
				width={800}
			>
				<div className="col-12">
					<Form form={form} ref={formRef} onFinish={onFinish}>
						<Form.Item name="name_item">
							<div className="form-group">
								<span>Nama Barang</span>
								<div className="controls">
									<Input
										type="text"
										name="name_item"
										className="form-control"
										placeholder="Nama Barang"
										onChange={formik.handleChange}
										value={formik.values.name_item}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="description"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<span>
									Deskripsi <span className="text-danger">*</span>
								</span>
								<div className="controls">
									<Input
										type="text"
										name="description"
										className="form-control"
										placeholder="Deskripsi"
										onChange={formik.handleChange}
										value={formik.values.description}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item name="user">
							<div className="form-group">
								<span>Nama Pemakai</span>
								<div className="controls">
									<Input
										type="text"
										name="user"
										className="form-control"
										placeholder="Nama Pemakai"
										onChange={formik.handleChange}
										value={formik.values.user}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item name="condition">
							<div className="form-group">
								<span>Kondisi</span>
								<div className="controls">
									<Input
										type="text"
										name="condition"
										className="form-control"
										placeholder="Kondisi"
										onChange={formik.handleChange}
										value={formik.values.condition}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item name="specification">
							<div className="form-group">
								<span>Spesifikasi</span>
								<div className="controls">
									<Input
										type="text"
										name="specification"
										className="form-control"
										placeholder="Spesifikasi"
										onChange={formik.handleChange}
										value={formik.values.specification}
									/>
								</div>
							</div>
						</Form.Item>
					</Form>
				</div>
			</AntdModal>

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

export default ServiceDelete;
