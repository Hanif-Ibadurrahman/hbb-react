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

const MasterUser = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IUserGetAllParams | undefined>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [initialValue, setInitialValue] = useState<ICreateUserRequest>({
		username: "",
		password: "",
		name: "",
		nipg: "",
		id_role: "",
		id_company: "",
	});
	const [dataTable, setDataTable] = useState();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionRole, setDataOptionRole] = useState<
		DefaultOptionType[] | undefined
	>([
		{ value: 1, label: "Super Admisnitrator" },
		{ value: 2, label: "Pengelola" },
		{ value: 3, label: "User" },
		{ value: 4, label: "PGNMAS" },
		{ value: 5, label: "Asisten Pengelola" },
		{ value: 6, label: "Pelapor" },
		{ value: 7, label: "Kepala Satker" },
		{ value: 8, label: "Admin Area" },
		{ value: 9, label: "Akuntansi" },
		{ value: 10, label: "Division Head" },
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
		setInitialValue({
			username: values.username || "",
			password: values.raw_password || "",
			name: values.name || "",
			nipg: values.nipg || "",
			id_role: values.id_role || "",
			id_company: values.id_company || "",
		});
		formRef.current?.setFieldsValue({
			username: values.username || "",
			password: values.raw_password || "",
			name: values.name || "",
			nipg: values.nipg || "",
			id_role: values.id_role || "",
			id_company: values.id_company || "",
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

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

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
		setInitialValue({
			username: "",
			password: "",
			name: "",
			nipg: "",
			id_role: "",
			id_company: "",
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
			updateUserApi(showModal.id, values).then(res => {
				if (res.data.status === "success") {
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
							title="User"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<>
									<button
										className="btn btn-secondary"
										onClick={() => setShowFilter(true)}
									>
										<i className="fa fa-filter">Filter</i>
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={handleAdd}
									>
										Tambah
									</button>
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
								<Input
									type="password"
									name="password"
									className="form-control"
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
						name="nipg"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								NIPG <span className="text-danger">*</span>
							</Title>
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
					<Form.Item name="id_company">
						<div className="form-group">
							<Title level={5}>Perusahaan</Title>
							<div className="controls">
								<Select
									showSearch
									placeholder="Pilih Perusahaan"
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
					<Form.Item name="id_role">
						<div className="form-group">
							<Title level={5}>Role</Title>
							<div className="controls">
								<Select
									showSearch
									placeholder="Pilih Role"
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionRole}
									onChange={(v, opt) => {
										formik.setFieldValue("id_role", v);
										formRef.current?.setFieldsValue({
											id_role: v,
										});
									}}
									value={formik.values.id_role}
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
