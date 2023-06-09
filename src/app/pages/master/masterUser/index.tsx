import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	createNewUserApi,
	deleteUserApi,
	getAllUserApi,
	getDetailUserApi,
	updateUserApi,
} from "api/user";
import {
	ICreateUserRequest,
	IUser,
	IUserGetAllParams,
} from "store/types/userTypes";
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
import { CheckResponse } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";
import { ModalFilter } from "./components/modalFilter";
import { SelectWithTag } from "app/components/selectWithTag";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import {
	getAllBusinessUnitApi,
	getDetailBusinessUnitApi,
} from "api/businessUnit";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllAreaApi, getDetailAreaApi } from "api/area";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
import { getAllWorkUnitApi, getDetailWorkUnitApi } from "api/workUnit";
import {
	isSuperadminGlobal,
	listCheckPermission,
	tokenDecode,
} from "app/helper/permission";
import { intersection } from "lodash";
import {
	checkDefaultOption,
	removeNullFields,
	valueAndLabelRole,
} from "app/helper/common";
import { getAllEmployeeApi, getDetailEmployeeApi } from "api/employee";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";

const MasterUser = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [selectedRole, setSelectedRole] = useState<string[]>();
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IUserGetAllParams | undefined>({
		per_page: 10,
	});
	const [paramsFilter, setParamsFilter] = useState<
		IUserGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
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
	const [showModal, setShowModal] = useState<{
		show: boolean;
		id?: number;
		uuid?: string;
	}>({
		show: false,
	});
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [initialValue, setInitialValue] =
		useState<Partial<ICreateUserRequest>>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
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
	const [dataOptionRole, setDataOptionRole] = useState<
		DefaultOptionType[] | undefined
	>(valueAndLabelRole);

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllUserApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailUserApi(id);
			handleInitialValue(response.data.data);
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
			if (id) {
				const response = await getDetailCompanyApi(id);
				const detail = response.data.data;
				setDataOptionCompany(
					dataOptionCompany?.concat({
						label: detail.name,
						value: detail.id,
					}),
				);
			}
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
				businessUnitList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataBusinessUnitDetail = async (id: number) => {
		try {
			if (id) {
				const response = await getDetailBusinessUnitApi(id);
				const detail = response.data.data;
				setDataOptionBusinessUnit(
					dataOptionBusinessUnit?.concat({
						label: detail.name,
						value: detail.id,
					}),
				);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataArea = async () => {
		try {
			const response = await getAllAreaApi({
				...areaParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnit,
			});
			const areaList = response.data.data;
			setDataOptionArea(areaList.map(v => ({ label: v.name, value: v.id })));
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataAreaDetail = async (id: number) => {
		try {
			if (id) {
				const response = await getDetailAreaApi(id);
				const detail = response.data.data;
				setDataOptionArea(
					dataOptionArea?.concat({ label: detail.name, value: detail.id }),
				);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkUnit = async () => {
		try {
			const response = await getAllWorkUnitApi({
				...workUnitParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnit,
				id_area: formik.values.id_area,
			});
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
			if (id) {
				const response = await getDetailWorkUnitApi(id);
				const detail = response.data.data;
				setDataOptionWorkUnit(
					dataOptionWorkUnit?.concat({
						label: detail.name,
						value: detail.id,
					}),
				);
			}
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

	const fetchDataEmployeeDetail = async (id: number, isAutoFill?: boolean) => {
		try {
			if (id) {
				const response = await getDetailEmployeeApi(id);
				const detail = response.data.data;

				if (isAutoFill) {
					formik.setFieldValue("nipg", detail.nipg);
					formRef.current?.setFieldsValue({
						nipg: detail.nipg,
					});
				} else {
					setDataOptionEmployee(
						dataOptionEmployee?.concat({
							label: detail.emp_name,
							value: detail.id,
						}),
					);
				}
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const handleInitialValue = (values: IUser) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionCompany!, setData.id_company)) {
			fetchDataCompanyDetail(setData.id_company);
		}
		if (!checkDefaultOption(dataOptionEmployee!, setData.id_emp)) {
			fetchDataEmployeeDetail(setData.id_emp);
		}
		if (!checkDefaultOption(dataOptionWorkUnit!, setData.id_satker)) {
			fetchDataWorkUnitDetail(setData.id_satker);
		}
		if (!checkDefaultOption(dataOptionArea!, setData.id_area)) {
			fetchDataAreaDetail(setData.id_area);
		}
		if (!checkDefaultOption(dataOptionBusinessUnit!, setData.id_bisnit)) {
			fetchDataBusinessUnitDetail(setData.id_bisnit);
		}
		setInitialValue({
			...setData,
			roles: values.user_roles.map(v => v.role_id),
			password: values.raw_password,
		});
		formRef.current?.setFieldsValue({
			...setData,
			roles: values.user_roles.map(v => v.role_id),
			password: values.raw_password,
		});
		setSelectedRole(values.user_roles.map(v => v.roles.name || ""));
	};

	useEffect(() => {
		fetchDataEmployee();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeParams]);

	useEffect(() => {
		fetchDataWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

	useEffect(() => {
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessUnitParams]);

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		const id = formik.values.id_emp;
		if (id) {
			fetchDataEmployeeDetail(id, true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_emp]);

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
				formik.setFieldValue("id_emp", undefined);
				formRef.current?.setFieldsValue({ id_emp: undefined });
			}
			fetchDataBusinessUnit();
			fetchDataEmployee();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_company]);

	useEffect(() => {
		const businessUnitId = formik.values.id_bisnit;
		if (businessUnitId) {
			const isInitialValueUndefined = initialValue?.id_bisnit === undefined;
			if (
				isInitialValueUndefined ||
				businessUnitId !== initialValue.id_bisnit
			) {
				formik.setFieldValue("id_area", undefined);
				formRef.current?.setFieldsValue({ id_area: undefined });
			}
			fetchDataArea();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_bisnit]);

	useEffect(() => {
		const areaId = formik.values.id_area;

		if (areaId) {
			const isInitialValueUndefined = initialValue?.id_area === undefined;
			if (isInitialValueUndefined || areaId !== initialValue.id_area) {
				formik.setFieldValue("id_satker", undefined);
				formRef.current?.setFieldsValue({ id_satker: undefined });
			}
			fetchDataWorkUnit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_area]);

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
					deleteUserApi(id)
						.then(res => {
							if (res.data.success === "success") {
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
		if (showModal.uuid) {
			updateUserApi(showModal.uuid, values)
				.then(res => {
					if (res.data.success === "success") {
						setShowModal({ show: false });
						Swal.fire({
							icon: "success",
							title: "User berhasil ditambahkan",
							showConfirmButton: false,
							timer: 3000,
						});
						fetchDataList();
					} else {
						Swal.fire({
							icon: "error",
							title: res.data.message,
							showConfirmButton: false,
							timer: 3000,
						});
					}
				})
				.catch((error: any) => {
					CheckResponse(error);
				});
		} else {
			createNewUserApi(values)
				.then(res => {
					if (res.data.success === "success") {
						setShowModal({ show: false });
						fetchDataList();
						Swal.fire({
							icon: "success",
							title: res.data.message,
							showConfirmButton: false,
							timer: 3000,
						});
					} else {
						Swal.fire({
							icon: "error",
							title: res.data.message,
							showConfirmButton: false,
							timer: 3000,
						});
					}
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
							title="User"
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
									{listCheckPermission.isAllowCreateMasterUser && (
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
							scroll={{ x: 1800 }}
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
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Username<span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="username"
									className="form-control"
									placeholder="Username"
									onChange={formik.handleChange}
									value={formik.values.username}
									autoComplete="off"
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
							{
								pattern: new RegExp(
									"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
								),
								// eslint-disable-next-line no-template-curly-in-string
								message:
									"Password minimal 8 karakter, terdiri dari kombinasi huruf kapital, huruf kecil, angka dan karakter khusus. Contoh: Bali2023!",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Password <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input.Password
									type="password"
									name="password"
									className="form-control"
									style={{ display: "inline-flex" }}
									placeholder="Password"
									onChange={formik.handleChange}
									value={formik.values.password}
									autoComplete="off"
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
								Nama User <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nama User"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
							{
								type: "email",
								message: "Harap isi email yang valid",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Email <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="email"
									className="form-control"
									placeholder="Email"
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="roles"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Role <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<SelectWithTag
									mode="multiple"
									dataOption={dataOptionRole}
									onChange={(v, opt) => {
										setSelectedRole(
											opt.map(v => {
												return v.label;
											}),
										);
										formik.setFieldValue("roles", v);
										formRef.current?.setFieldsValue({
											roles: v,
										});
									}}
									value={formik.values.roles}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_bisnit"
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
										formik.setFieldValue("id_bisnit", v);
										formRef.current?.setFieldsValue({
											id_bisnit: v,
										});
									}}
									value={formik.values.id_bisnit}
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
					<Form.Item
						name="id_emp"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>Pegawai</Title>
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
										formik.setFieldValue("id_emp", v);
										formRef.current?.setFieldsValue({
											id_emp: v,
										});
									}}
									value={formik.values.id_emp}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="nipg">
						<div className="form-group">
							<Title level={5}>NIPG</Title>
							<div className="controls">
								<Input
									type="text"
									name="nipg"
									className="form-control"
									placeholder="NIPG"
									onChange={formik.handleChange}
									value={formik.values.nipg}
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
					setBusinessUnitParams,
					setCompanyParams,
				}}
				options={{
					dataOptionBusinessUnit,
					dataOptionRole,
					dataOptionCompany,
				}}
			/>
		</>
	);
};

export default MasterUser;
