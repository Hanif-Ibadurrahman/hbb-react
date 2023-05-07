import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ICreateEmployeeRequest,
	IEmployee,
	IEmployeeGetAllParams,
	IEmployeePaginateResponse,
} from "store/types/employeeTypes";
import {
	createNewEmployeeApi,
	deleteEmployeeApi,
	getAllEmployeeApi,
	getDetailEmployeeApi,
	updateEmployeeApi,
} from "api/employee";
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
import { ModalFilter } from "./components/modalFilter";
import { listCheckPermission } from "app/helper/permission";
import { checkDefaultOption, removeNullFields } from "app/helper/common";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { DefaultOptionType } from "antd/es/select";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";

const MasterEmployee = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IEmployeeGetAllParams | undefined>({
		per_page: 10,
	});
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
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
		useState<Partial<ICreateEmployeeRequest>>();
	const [dataTable, setDataTable] = useState<IEmployeePaginateResponse>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllEmployeeApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailEmployeeApi(id);
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
			const response = await getDetailCompanyApi(id);
			const detail = response.data.data;
			setDataOptionCompany([{ label: detail.name, value: detail.id }]);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const handleInitialValue = (values: IEmployee) => {
		const setData = removeNullFields(values);
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
		fetchDataCompany();
		setShowModal({ show: true });
		setInitialValue(undefined);
		formik.resetForm();
		formRef.current?.resetFields();
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
					deleteEmployeeApi(id).then(res => {
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
			updateEmployeeApi(showModal.id, values)
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
					Swal.fire({
						icon: "error",
						title: error.response.data.message,
						showConfirmButton: false,
						timer: 3000,
					});
				});
		} else {
			createNewEmployeeApi(values)
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
					Swal.fire({
						icon: "error",
						title: error.response.data.message,
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
							title="Pegawai"
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
									{listCheckPermission.isAllowCreateMasterEmployee && (
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
					<Form.Item
						name="emp_name"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Nama <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="emp_name"
									className="form-control"
									placeholder="Nama Pegawai"
									onChange={formik.handleChange}
									value={formik.values.emp_name}
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
					<Form.Item name="position">
						<div className="form-group">
							<Title level={5}>Jabatan</Title>
							<div className="controls">
								<Input
									type="text"
									name="position"
									className="form-control"
									placeholder="Jabatan"
									onChange={formik.handleChange}
									value={formik.values.position}
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
											id_company: v,
										});
									}}
									value={formik.values.id_company}
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

export default MasterEmployee;
