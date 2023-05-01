import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
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
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { CheckAuthentication } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi } from "api/company";
import { ModalFilter } from "./components/modalFilter";
import { SelectWithTag } from "app/components/selectWithTag";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { getAllBusinessUnitApi } from "api/businessUnit";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllAreaApi } from "api/area";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
import { getAllWorkUnitApi } from "api/workUnit";
import { listCheckPermission } from "app/helper/permission";

const MasterUser = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [selectedRole, setSelectedRole] = useState<string[]>();
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IUserGetAllParams | undefined>();
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
	const [showModal, setShowModal] = useState<{
		show: boolean;
		id?: string;
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
	const [initialValue, setInitialValue] = useState<ICreateUserRequest>({
		username: "",
		password: "",
		name: "",
		nipg: "",
		roles: [],
		id_company: "",
		id_area: "",
		id_bisnit: "",
		id_satker: "",
	});
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
	const [dataOptionRole, setDataOptionRole] = useState<
		DefaultOptionType[] | undefined
	>([
		{ value: 1, label: "Super Admin" },
		{ value: 2, label: "Pengelola" },
		{ value: 3, label: "Admin Area" },
		{ value: 4, label: "Kepala Satuan Kerja" },
		{ value: 5, label: "User" },
	]);

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllUserApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailUserApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IUser) => {
		console.log(values);
		setInitialValue({
			username: values.username || "",
			password: values.raw_password || "",
			name: values.name || "",
			nipg: values.nipg || "",
			roles: values.user_roles?.map(v => v.role_id),
			id_company: values.id_company || "",
			id_area: values.id_area || "",
			id_bisnit: values.id_bisnit || "",
			id_satker: values.id_satker || "",
		});
		formRef.current?.setFieldsValue({
			username: values.username || "",
			password: values.raw_password || "",
			name: values.name || "",
			nipg: values.nipg || "",
			roles: values.user_roles?.map(v => v.role_id),
			id_company: values.id_company || "",
			id_area: values.id_area || "",
			id_bisnit: values.id_bisnit || "",
			id_satker: values.id_satker || "",
		});
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

	const fetchDataBusinessUnit = async () => {
		try {
			const response = await getAllBusinessUnitApi(businessUnitParams);
			const businessUnitList = response.data.data.data;
			setDataOptionBusinessUnit(
				businessUnitList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataArea = async () => {
		try {
			const response = await getAllAreaApi(areaParams);
			const areaList = response.data.data.data;
			setDataOptionArea(
				areaList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataWorkUnit = async () => {
		try {
			const response = await getAllWorkUnitApi(workUnitParams);
			const workUnitList = response.data.data.data;
			setDataOptionWorkUnit(
				workUnitList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

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

	const handleAdd = () => {
		setShowModal({ show: true });
		setInitialValue({
			username: "",
			password: "",
			name: "",
			nipg: "",
			roles: [],
			id_company: "",
			id_area: "",
			id_bisnit: "",
			id_satker: "",
		});
		formik.resetForm();
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
					deleteUserApi(id).then(res => {
						if (res.data.success === "success") {
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
		if (showModal.uuid) {
			updateUserApi(showModal.uuid, values).then(res => {
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
			});
		} else {
			createNewUserApi(values).then(res => {
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
							title="User"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPageAndSort={setSelectedPageAndSort}
							contentHeader={
								<>
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
			>
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Divider />
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
								/>
							</div>
						</div>
					</Form.Item>
					{selectedRole?.includes("User") && (
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
					)}
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
											id_area: parseInt(v),
										});
									}}
									value={formik.values.id_area}
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
											id_bisnit: parseInt(v),
										});
									}}
									value={formik.values.id_bisnit}
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
									onSearch={v => setWorkUnitParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionWorkUnit}
									onChange={(v, opt) => {
										formik.setFieldValue("id_satker", v);
										formRef.current?.setFieldsValue({
											id_satker: parseInt(v),
										});
									}}
									value={formik.values.id_satker}
								/>
							</div>
						</div>
					</Form.Item>
				</Form>
			</AntdModal>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/>
		</MainLayout>
	);
};

export default MasterUser;
