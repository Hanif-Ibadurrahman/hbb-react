import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ICreateLocationRequest,
	ILocation,
	ILocationGetAllParams,
} from "store/types/locationTypes";
import {
	createNewLocationApi,
	deleteLocationApi,
	getAllLocationApi,
	getDetailLocationApi,
	updateLocationApi,
} from "api/location";
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
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
import { DefaultOptionType } from "antd/es/select";
import { CheckResponse } from "app/helper/authentication";
import {
	getAllBusinessUnitApi,
	getDetailBusinessUnitApi,
} from "api/businessUnit";
import { getAllAreaApi, getDetailAreaApi } from "api/area";
import { getAllWorkUnitApi, getDetailWorkUnitApi } from "api/workUnit";
import { getAllEmployeeApi, getDetailEmployeeApi } from "api/employee";
import { ModalFilter } from "./components/modalFilter";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { listCheckPermission } from "app/helper/permission";
import { checkDefaultOption, removeNullFields } from "app/helper/common";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";
import { IDivisionGetAllParams } from "store/types/divisionTypes";
import { getAllDivisionApi, getDetailDivisionApi } from "api/division";

const MasterLocation = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<ILocationGetAllParams | undefined>({
		per_page: 10,
	});
	const [paramsFilter, setParamsFilter] = useState<
		ILocationGetAllParams | undefined
	>();
	const [businessUnitParams, setBusinessUnitParams] = useState<
		IBusinessUnitGetAllParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
	const [workUnitParams, setWorkUnitParams] = useState<
		IWorkUnitGetAllParams | undefined
	>();
	const [employeeParams, setEmployeeParams] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [divisionParams, setDivisionParams] = useState<
		IDivisionGetAllParams | undefined
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
	const [initialValue, setInitialValue] =
		useState<Partial<ICreateLocationRequest>>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionArea, setDataOptionArea] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkUnit, setDataOptionWorkUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionEmployee, setDataOptionEmployee] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionDivision, setDataOptionDivision] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllLocationApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailLocationApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataBusinessUnit = async () => {
		try {
			const response = await getAllBusinessUnitApi(businessUnitParams);
			const businessUnitList = response.data.data;
			setDataOptionBusinessUnit(
				businessUnitList.map(v => ({ label: v.name, value: v.id })),
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
			const response = await getAllAreaApi(areaParams);
			const areaList = response.data.data;
			setDataOptionArea(areaList.map(v => ({ label: v.name, value: v.id })));
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

	const fetchDataWorkUnit = async () => {
		try {
			const response = await getAllWorkUnitApi(workUnitParams);
			const workUnitList = response.data.data;
			setDataOptionWorkUnit(
				workUnitList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkUnitDetail = async (id: number) => {
		try {
			const response = await getDetailWorkUnitApi(id);
			const detail = response.data.data;
			setDataOptionWorkUnit(
				dataOptionWorkUnit?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDivision = async () => {
		try {
			const response = await getAllDivisionApi(divisionParams);
			const divisionList = response.data.data;
			setDataOptionDivision(
				divisionList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDivisionDetail = async (id: number) => {
		try {
			const response = await getDetailDivisionApi(id);
			const detail = response.data.data;
			setDataOptionDivision(
				dataOptionDivision?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataEmployee = async () => {
		try {
			const response = await getAllEmployeeApi(employeeParams);
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

	const handleInitialValue = (values: ILocation) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionDivision!, setData.id_division)) {
			fetchDataDivisionDetail(setData.id_division);
		}
		if (!checkDefaultOption(dataOptionBusinessUnit!, setData.id_bisnis_unit)) {
			fetchDataBusinessUnitDetail(setData.id_bisnis_unit);
		}
		if (!checkDefaultOption(dataOptionArea!, setData.id_area)) {
			fetchDataAreaDetail(setData.id_area);
		}
		if (!checkDefaultOption(dataOptionWorkUnit!, setData.id_satker)) {
			fetchDataWorkUnitDetail(setData.id_satker);
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
		fetchDataDivision();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [divisionParams]);

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
		fetchDataWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

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

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

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
					deleteLocationApi(id)
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
		if (showModal.id) {
			updateLocationApi(showModal.id, values)
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
			const input = { ...values, from_opname: 0 };
			createNewLocationApi(input)
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
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Lokasi"
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
									{listCheckPermission.isAllowCreateMasterLocation && (
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
							scroll={{ x: 1500 }}
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
					<Form.Item
						name="id_bisnis_unit"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Bisnis Unit <span className="text-danger">*</span>
							</Title>
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
					<Form.Item
						name="id_area"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Area <span className="text-danger">*</span>
							</Title>
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
						name="id_satker"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Satuan Kerja <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setWorkUnitParams({ satker: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionWorkUnit}
									onChange={(v, opt) => {
										formik.setFieldValue("id_satker", v);
										formRef.current?.setFieldsValue({
											id_satker: v,
										});
									}}
									value={formik.values.id_satker}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_division">
						<div className="form-group">
							<Title level={5}>Divisi</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setDivisionParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionDivision}
									onChange={(v, opt) => {
										formik.setFieldValue("id_division", v);
										formRef.current?.setFieldsValue({
											id_division: v,
										});
									}}
									value={formik.values.id_division}
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
								Lokasi <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Lokasi"
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
								Penanggung Jawab <span className="text-danger">*</span>
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
			/>
		</MainLayout>
	);
};

export default MasterLocation;
