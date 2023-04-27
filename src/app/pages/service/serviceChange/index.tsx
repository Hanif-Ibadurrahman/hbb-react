import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { Modal as AntdModal, Button, Form, FormInstance, Input } from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
	ICreateServiceChangeRequest,
	IServiceChangeGetAllParams,
	IServiceChangePaginateResponse,
} from "store/types/serviceChangeTypes";
import {
	createNewServiceChangeApi,
	deleteServiceChangeApi,
	getAllServiceChangeApi,
	getDetailServiceChangeApi,
	updateServiceChangeApi,
} from "api/serviceChange";
import { IServiceChange } from "store/types/serviceChangeTypes";
import { CheckAuthentication } from "app/helper/authentication";
import { IItemGetAllParams } from "store/types/itemTypes";
import { DefaultOptionType } from "antd/es/select";
import { getAllItemApi } from "api/item";

const ServiceChange = () => {
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [params, setParams] = useState<
		IServiceChangeGetAllParams | undefined
	>();
	const [itemParams, setItemParams] = useState<IItemGetAllParams | undefined>();
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
		useState<ICreateServiceChangeRequest>();
	const [dataTable, setDataTable] = useState<IServiceChangePaginateResponse>();
	const [dataOptionItem, setDataOptionItem] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllServiceChangeApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailServiceChangeApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IServiceChange) => {
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

	const fetchDataItem = async () => {
		try {
			const response = await getAllItemApi(itemParams);
			const itemList = response.data.data.data;
			setDataOptionItem(
				itemList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchDataItem();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemParams]);

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
		// setInitialValue({

		// });
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
					deleteServiceChangeApi(id).then(res => {
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
			updateServiceChangeApi(showModal.id, values).then(res => {
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
			createNewServiceChangeApi(values).then(res => {
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

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Permintaan Layanan - Perubahan"
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
									{/* <Select
										showSearch
										onSearch={v => setAreaParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionArea}
										onChange={(v, opt) => {
											formik.setFieldValue("id_area", v);
											formRef.current?.setFieldsValue({
												id_area: v,
											});
										}}
										value={formik.values.id_area}
									/> */}
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
										value={formik.values.spesification}
									/>
								</div>
							</div>
						</Form.Item>
					</Form>
				</div>
			</AntdModal>

			{/* <ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/> */}
		</MainLayout>
	);
};

export default ServiceChange;
