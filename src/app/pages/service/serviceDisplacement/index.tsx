import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import {
	Modal as AntdModal,
	Button,
	DatePicker,
	Divider,
	Form,
	FormInstance,
	Select,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
	ICreateServiceDisplacementRequest,
	IServiceDisplacementGetAllParams,
	IServiceDisplacementPaginateResponse,
} from "store/types/serviceDisplacementTypes";
import {
	approveServiceDisplacementApi,
	createNewServiceDisplacementApi,
	getAllServiceDisplacementApi,
	getDetailServiceDisplacementApi,
	rejectServiceDisplacementApi,
	updateServiceDisplacementApi,
} from "api/serviceDisplacement";
import { IServiceDisplacement } from "store/types/serviceDisplacementTypes";
import { CheckAuthentication } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import { getAllItemApi } from "api/item";
import { IItemGetAllParams } from "store/types/itemTypes";
import { IUserGetAllParams } from "store/types/userTypes";
import { getAllUserApi } from "api/user";
import { getAllCompanyApi } from "api/company";
import { getAllWorkflowApi } from "api/workflow";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { IWorkflowGetAllParams } from "store/types/workflowTypes";

const ServiceDisplacement = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [params, setParams] = useState<
		IServiceDisplacementGetAllParams | undefined
	>();
	const [itemParams, setItemParams] = useState<IItemGetAllParams | undefined>();
	const [userParams, setUserParams] = useState<IUserGetAllParams | undefined>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [workflowParams, setWorkflowParams] = useState<
		IWorkflowGetAllParams | undefined
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
		useState<ICreateServiceDisplacementRequest>();
	const [dataTable, setDataTable] =
		useState<IServiceDisplacementPaginateResponse>();
	const [dataOptionItem, setDataOptionItem] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionUser, setDataOptionUser] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkflow, setDataOptionWorkflow] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllServiceDisplacementApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailServiceDisplacementApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IServiceDisplacement) => {
		// const setData = {
		// };
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

	const fetchDataUser = async () => {
		try {
			const response = await getAllUserApi(userParams);
			const userList = response.data.data.data;
			setDataOptionUser(
				userList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataCompany = async () => {
		try {
			const response = await getAllCompanyApi(companyParams);
			const companyList = response.data.data.data;
			setDataOptionCompany(
				companyList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataWorkflow = async () => {
		try {
			const response = await getAllWorkflowApi(workflowParams);
			const workflowList = response.data.data.data;
			setDataOptionWorkflow(
				workflowList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchDataWorkflow();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflowParams]);

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

	useEffect(() => {
		fetchDataUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userParams]);

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

	const handleApprove = (id: string) => {
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
				text: "Ingin menyetujui permintaan ini",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Approve",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					approveServiceDisplacementApi(id).then(res => {
						if (res.data.status === "success") {
							swalCustom.fire(
								"Approve",
								"Data ini telah disetujui.",
								"success",
							);
							fetchDataList();
						} else {
							swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
						}
					});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Permintaan ini batal disetujui", "error");
				}
			});
	};

	const handleAdd = () => {
		setShowModal({ show: true });
		// setInitialValue({});
		formRef.current?.resetFields();
	};

	const handleReject = (id: string) => {
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
					rejectServiceDisplacementApi(id).then(res => {
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
			updateServiceDisplacementApi(showModal.id, values).then(res => {
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
			const input = {
				...values,
				tipe: "PEMINDAHAN",
			};
			createNewServiceDisplacementApi(input).then(res => {
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
							title="Permintaan Layanan - Pemindahan"
							dataSource={dataTable}
							columns={columns({ handleApprove, handleReject })}
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
				title={
					<Title level={3}>
						{showModal.show && showModal.id ? "Edit Data" : "Tambah Data"}
					</Title>
				}
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
						<Divider />
						<Form.Item
							name="date"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Tanggal <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<DatePicker
										className="form-control"
										onChange={(value, dateString) => {
											formik.setFieldValue("date", dateString);
											formRef.current?.setFieldsValue({
												date: dateString,
											});
										}}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="id_inventory"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Barang <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setItemParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionItem}
										onChange={(v, opt) => {
											formik.setFieldValue("id_inventory", v);
											formRef.current?.setFieldsValue({
												id_inventory: parseInt(v),
											});
										}}
										value={formik.values.id_inventory}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="from_user"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Dari Pengguna <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setUserParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionUser}
										onChange={(v, opt) => {
											formik.setFieldValue("from_user", v);
											formRef.current?.setFieldsValue({
												from_user: parseInt(v),
											});
										}}
										value={formik.values.from_user}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="to_user"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Untuk Pengguna <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setUserParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionUser}
										onChange={(v, opt) => {
											formik.setFieldValue("to_user", v);
											formRef.current?.setFieldsValue({
												to_user: parseInt(v),
											});
										}}
										value={formik.values.to_user}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="id_company"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Perusahaan <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setCompanyParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionCompany}
										onChange={(v, opt) => {
											formik.setFieldValue("id_company", v);
											formRef.current?.setFieldsValue({
												id_company: parseInt(v),
											});
										}}
										value={formik.values.id_company}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="id_workflow"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Workflow <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setWorkflowParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionWorkflow}
										onChange={(v, opt) => {
											formik.setFieldValue("id_workflow", v);
											formRef.current?.setFieldsValue({
												id_workflow: parseInt(v),
											});
										}}
										value={formik.values.id_workflow}
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
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Daerah</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Pengelola</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">NIPG</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Pemegang</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag />
			</SideModal>
		</MainLayout>
	);
};

export default ServiceDisplacement;
