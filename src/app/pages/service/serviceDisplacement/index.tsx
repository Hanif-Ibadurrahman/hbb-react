import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
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
	deleteServiceDisplacementApi,
	getAllServiceDisplacementApi,
	getDetailServiceDisplacementApi,
	rejectServiceDisplacementApi,
	updateServiceDisplacementApi,
} from "api/serviceDisplacement";
import { IServiceDisplacement } from "store/types/serviceDisplacementTypes";
import { CheckAuthentication } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import { getAllCompanyApi } from "api/company";
import { getAllWorkflowApi } from "api/workflow";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { IWorkflowGetAllParams } from "store/types/workflowTypes";
import { isAllowCreateServiceDisplacement } from "app/helper/permission";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { getAllEmployeeApi } from "api/employee";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { getAllLocationApi } from "api/location";
import { IInventoryGetAllParams } from "store/types/inventoryTypes";
import { getAllInventoryApi } from "api/inventory";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ModalFilter } from "./components/modalFilter";

const ServiceDisplacement = () => {
	dayjs.extend(customParseFormat);
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<
		IServiceDisplacementGetAllParams | undefined
	>();
	const [inventoryParams, setInventoryParams] = useState<
		IInventoryGetAllParams | undefined
	>();
	const [employeeParams, setEmployeeParams] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [workflowParams, setWorkflowParams] = useState<
		IWorkflowGetAllParams | undefined
	>();
	const [locationParams, setLocationParams] = useState<
		ILocationGetAllParams | undefined
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
	const [dataOptionInventory, setDataOptionInventory] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionEmployee, setDataOptionEmployee] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkflow, setDataOptionWorkflow] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionLocation, setDataOptionLocation] = useState<
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
		setInitialValue({
			date: values.date || "",
			id_inventory: values.id_inventory || "",
			from_user: values.from_user || "",
			to_user: values.to_user || "",
			id_company: values.id_company || "",
			id_lokasi: values.id_lokasi || "",
			id_workflow: "",
		});
		formRef.current?.setFieldsValue({
			date: values.date || "",
			id_inventory: values.id_inventory || "",
			from_user: values.from_user || "",
			to_user: values.to_user || "",
			id_company: values.id_company || "",
			id_lokasi: values.id_lokasi || "",
			id_workflow: "",
		});
	};

	const fetchDataInventory = async () => {
		try {
			const availableInventory = { ...inventoryParams, status: 1 };
			const response = await getAllInventoryApi(availableInventory);
			const inventoryList = response.data.data.data;
			setDataOptionInventory(
				inventoryList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataEmployee = async () => {
		try {
			const response = await getAllEmployeeApi(employeeParams);
			const employeeList = response.data.data.data;
			setDataOptionEmployee(
				employeeList.map(v => ({ label: v.emp_name, value: `${v.id}` })),
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

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi(locationParams);
			const locationList = response.data.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchDataInventory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inventoryParams]);

	useEffect(() => {
		fetchDataWorkflow();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflowParams]);

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

	useEffect(() => {
		fetchDataEmployee();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeParams]);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

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
		setInitialValue({
			date: "",
			id_inventory: "",
			from_user: "",
			to_user: "",
			id_company: "",
			id_lokasi: "",
			id_workflow: "",
		});
		formik.resetForm();
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
				showCancelButton: true,
				confirmButtonText: "Reject",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					rejectServiceDisplacementApi(id, { remark: result.value }).then(
						res => {
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
						},
					);
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Permintaan ini batal direject", "error");
				}
			});
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
					deleteServiceDisplacementApi(id).then(res => {
						if (res.data.status === "success") {
							swalCustom.fire("Delete", "Data ini telah dihapus.", "success");
							fetchDataList();
						} else {
							swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
						}
					});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Data ini batal dihapus", "error");
				}
			});
	};

	const onFinish = (values: any) => {
		if (showModal.id) {
			const input = {
				...values,
				tipe: "PEMINDAHAN",
			};
			updateServiceDisplacementApi(showModal.id, input).then(res => {
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
							columns={columns({
								setShowModal,
								handleDelete,
								handleApprove,
								handleReject,
							})}
							setSelectedPageAndSort={setSelectedPageAndSort}
							contentHeader={
								<>
									<button
										className="btn btn-secondary"
										onClick={() => setShowFilter(true)}
									>
										<i className="fa fa-filter" />
									</button>
									{isAllowCreateServiceDisplacement && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={handleAdd}
										>
											Tambah
										</button>
									)}
								</>
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
											console.log(dateString);
											formik.setFieldValue("date", dateString);
											formRef.current?.setFieldsValue({
												date: dateString,
											});
										}}
										format={"YYYY-MM-DD"}
										value={
											formik.values.date
												? dayjs(formik.values.date, "YYYY-MM-DD")
												: undefined
										}
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
									Inventaris <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setInventoryParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionInventory}
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
										onSearch={v => setEmployeeParams({ emp_name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionEmployee}
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
										onSearch={v => setEmployeeParams({ emp_name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionEmployee}
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
							name="id_lokasi"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Lokasi <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setLocationParams({ name: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionLocation}
										onChange={(v, opt) => {
											formik.setFieldValue("id_lokasi", v);
											formRef.current?.setFieldsValue({
												id_lokasi: parseInt(v),
											});
										}}
										value={formik.values.id_lokasi}
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

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/>
		</MainLayout>
	);
};

export default ServiceDisplacement;
