import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ICreateWorkUnitRequest,
	IWorkUnit,
	IWorkUnitGetAllParams,
} from "store/types/workUnitTypes";
import {
	createNewWorkUnitApi,
	deleteWorkUnitApi,
	getAllWorkUnitApi,
	getDetailWorkUnitApi,
	updateWorkUnitApi,
} from "api/workUnit";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Select,
	Space,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { DefaultOptionType } from "antd/es/select";
import {
	getAllBusinessUnitApi,
	getDetailBusinessUnitApi,
} from "api/businessUnit";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllAreaApi, getDetailAreaApi } from "api/area";
import { CheckResponse } from "app/helper/authentication";
import { ModalFilter } from "./components/modalFilter";
import {
	isSuperadminGlobal,
	listCheckPermission,
	tokenDecode,
} from "app/helper/permission";
import { getAllEmployeeApi, getDetailEmployeeApi } from "api/employee";
import { checkDefaultOption, removeNullFields } from "app/helper/common";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";

const MasterWorkUnit = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IWorkUnitGetAllParams | undefined>({
		per_page: 10,
	});
	const [paramsFilter, setParamsFilter] = useState<
		IWorkUnitGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [businessUnitParams, setBusinessUnitParams] = useState<
		IBusinessUnitGetAllParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
	const [employeeParams, setEmployeeParams] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [initialValue, setInitialValue] = useState<ICreateWorkUnitRequest>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionArea, setDataOptionArea] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionEmployee, setDataOptionEmployee] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllWorkUnitApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailWorkUnitApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataBusinessUnit = async () => {
		try {
			const response = await getAllBusinessUnitApi({
				...businessUnitParams,
				id_company: formik.values.id_company,
			});
			const businessUnitList = response.data.data;
			setDataOptionBusinessUnit(
				businessUnitList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataBusinessUnitDetail = async (id: number) => {
		try {
			const response = await getDetailBusinessUnitApi(id);
			const detail = response.data.data;
			setDataOptionBusinessUnit(
				dataOptionBusinessUnit?.concat({
					label: detail.name,
					value: detail.id,
				}),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataArea = async () => {
		try {
			const response = await getAllAreaApi({
				...areaParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
			});
			const areaList = response.data.data;
			setDataOptionArea(
				areaList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataAreaDetail = async (id: number) => {
		try {
			const response = await getDetailAreaApi(id);
			const detail = response.data.data;
			setDataOptionArea(
				dataOptionArea?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataEmployee = async () => {
		try {
			const response = await getAllEmployeeApi({
				...employeeParams,
				id_company: formik.values.id_company,
			});
			const employeeList = response.data.data.data;
			setDataOptionEmployee(
				employeeList.map(v => ({ label: v.emp_name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataEmployeeDetail = async (id: number) => {
		try {
			const response = await getDetailEmployeeApi(id);
			const detail = response.data.data;
			setDataOptionEmployee(
				dataOptionEmployee?.concat({
					label: detail.emp_name,
					value: detail.id,
				}),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCompany = async () => {
		try {
			const response = await getAllCompanyApi(companyParams);
			const companyList = response.data.data;
			setDataOptionCompany(
				companyList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCompanyDetail = async (id: number) => {
		try {
			const response = await getDetailCompanyApi(id);
			const detail = response.data.data;
			setDataOptionCompany(
				dataOptionCompany?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const handleInitialValue = (values: IWorkUnit) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionBusinessUnit!, setData.id_bisnis_unit)) {
			fetchDataBusinessUnitDetail(setData.id_bisnis_unit);
		}
		if (!checkDefaultOption(dataOptionArea!, setData.id_area)) {
			fetchDataAreaDetail(setData.id_area);
		}
		if (!checkDefaultOption(dataOptionEmployee!, setData.id_pegawai)) {
			fetchDataEmployeeDetail(setData.id_pegawai);
		}
		if (!checkDefaultOption(dataOptionCompany!, setData.id_company)) {
			fetchDataCompanyDetail(setData.id_company);
		}
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
	};

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

	useEffect(() => {
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessUnitParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataEmployee();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeParams]);

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
		setParams({
			page: params?.page,
			per_page: params?.per_page,
			order_by: params?.order_by,
			sort: params?.sort,
			...paramsFilter,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsFilter]);

	useEffect(() => {
		if (showModal.show && showModal.id) {
			fetchDataDetail(showModal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	useEffect(() => {
		const companyId = formik.values.id_company;
		if (companyId) {
			const isInitialValueUndefined = initialValue?.id_company === undefined;
			if (isInitialValueUndefined || companyId !== initialValue.id_company) {
				formik.setFieldValue("id_bisnis_unit", undefined);
				formRef.current?.setFieldsValue({ id_bisnis_unit: undefined });
				formik.setFieldValue("id_pegawai", undefined);
				formRef.current?.setFieldsValue({ id_pegawai: undefined });
			}
			fetchDataBusinessUnit();
			fetchDataEmployee();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_company]);

	useEffect(() => {
		const businessUnitId = formik.values.id_bisnis_unit;
		if (businessUnitId) {
			const isInitialValueUndefined =
				initialValue?.id_bisnis_unit === undefined;
			if (
				isInitialValueUndefined ||
				businessUnitId !== initialValue.id_bisnis_unit
			) {
				formik.setFieldValue("id_area", undefined);
				formRef.current?.setFieldsValue({ id_area: undefined });
			}
			fetchDataArea();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_bisnis_unit]);

	const handleAdd = () => {
		setShowModal({ show: true });
		setInitialValue(undefined);
		formik.resetForm();
		form.resetFields();
	};

	const handleDelete = (id: number) => {
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
					deleteWorkUnitApi(id)
						.then(res => {
							if (res.data.status === "success") {
								swalCustom.fire("Delete", "Data ini telah dihapus.", "success");
								fetchDataList();
							} else {
								swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
							}
						})
						.catch((error: any) => {
							CheckResponse(error);
						});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Data ini batal dihapus", "error");
				}
			});
	};

	const onFinish = (values: any) => {
		if (!isSuperadminGlobal) {
			values = { ...values, id_company: tokenDecode?.user?.id_company };
		}
		if (showModal.id) {
			updateWorkUnitApi(showModal.id, values)
				.then(res => {
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
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
		} else {
			createNewWorkUnitApi(values)
				.then(res => {
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
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
		}
	};

	const handleCancel = () => {
		setShowModal({ show: false });
	};

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Satuan Kerja"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPageAndSort={setSelectedPageAndSort}
							contentHeader={
								<Space
									style={{
										display: "flex",
										justifyContent: "end",
										marginBottom: "1em",
									}}
								>
									<button
										className="btn btn-secondary"
										onClick={() => setShowFilter(true)}
									>
										<i className="fa fa-filter" />
									</button>
									{listCheckPermission.isAllowCreateMasterSatuanKerja && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={handleAdd}
										>
											Tambah
										</button>
									)}
								</Space>
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
						<Button shape="round" size="large" onClick={handleCancel}>
							Close
						</Button>
						<Button
							type="primary"
							size="large"
							shape="round"
							onClick={form.submit}
						>
							Save
						</Button>
					</div>
				}
				onCancel={handleCancel}
				open={showModal.show}
				width={800}
				destroyOnClose
			>
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Divider />
					{isSuperadminGlobal && (
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
												id_company: v,
											});
										}}
										value={formik.values.id_company}
									/>
								</div>
							</div>
						</Form.Item>
					)}
					<Form.Item name="id_bisnis_unit">
						<div className="form-group">
							<Title level={5}>Bisnis Unit</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setBusinessUnitParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionBusinessUnit}
									onChange={(v, opt) => {
										formik.setFieldValue("id_bisnis_unit", v);
										formRef.current?.setFieldsValue({
											id_bisnis_unit: v,
										});
									}}
									value={formik.values.id_bisnis_unit}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_area">
						<div className="form-group">
							<Title level={5}>Area</Title>
							<div className="controls">
								<Select
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
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Nama Satuan Kerja <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nama Satuan Kerja"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_pegawai"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Nama Kepala Satuan Kerja <span className="text-danger">*</span>
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
										formik.setFieldValue("id_pegawai", v);
										formRef.current?.setFieldsValue({
											id_pegawai: v,
										});
									}}
									value={formik.values.id_pegawai}
								/>
							</div>
						</div>
					</Form.Item>
				</Form>
			</AntdModal>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParamsFilter}
				setParamsOption={{
					setCompanyParams,
				}}
				options={{
					dataOptionCompany,
				}}
			/>
		</>
	);
};

export default MasterWorkUnit;
