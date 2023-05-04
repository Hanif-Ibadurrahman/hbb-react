import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	Modal as AntdModal,
	Button,
	Col,
	Divider,
	Form,
	FormInstance,
	Image,
	Input,
	List,
	Row,
	Select,
	Space,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
	ICreateServiceChangeRequest,
	IServiceChangeGetAllParams,
	IServiceChangePaginateResponse,
} from "store/types/serviceChangeTypes";
import {
	approveServiceChangeApi,
	createNewServiceChangeApi,
	deleteServiceChangeApi,
	getAllServiceChangeApi,
	getDetailServiceChangeApi,
	rejectServiceChangeApi,
	updateServiceChangeApi,
} from "api/serviceChange";
import { IServiceChange } from "store/types/serviceChangeTypes";
import { CheckAuthentication } from "app/helper/authentication";
import { UploadOutlined } from "@ant-design/icons";
import { listCheckPermission } from "app/helper/permission";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { DefaultOptionType } from "antd/es/select";
import { getAllCompanyApi } from "api/company";
import { getAllEmployeeApi } from "api/employee";
import { IWorkflowGetAllParams } from "store/types/workflowTypes";
import { getAllWorkflowApi } from "api/workflow";
import { ModalFilter } from "./components/modalFilter";
import { IInventoryGetAllParams } from "store/types/inventoryTypes";
import { getAllInventoryApi } from "api/inventory";

const ServiceChange = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<File[] | null>(null);
	const [files, setFiles] = useState<FileList | null>(null);
	const inputFile = useRef<HTMLInputElement | null>(null);
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IServiceChangeGetAllParams | undefined>({
		per_page: 10,
	});
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [inventoryParams, setInventoryParams] = useState<
		IInventoryGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [employeeParams, setEmployeeParams] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [workflowParams, setWorkflowParams] = useState<
		IWorkflowGetAllParams | undefined
	>();
	const [linkFile, setLinkFile] = useState<string[]>();
	const [showModalFile, setShowModalFile] = useState<boolean>(false);
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [initialValue, setInitialValue] = useState<ICreateServiceChangeRequest>(
		{
			inventory_code: "",
			description: "",
			condition: "",
			created_by: "",
			files: null,
			id_company: "",
			id_workflow: "",
			emp_name: "",
			spesification: "",
		},
	);
	const [dataTable, setDataTable] = useState<IServiceChangePaginateResponse>();
	const [dataOptionInventory, setDataOptionInventory] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionEmployee, setDataOptionEmployee] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkflow, setDataOptionWorkflow] = useState<
		DefaultOptionType[] | undefined
	>();

	const handleFile = (event: SyntheticEvent) => {
		const target = event.nativeEvent.target as HTMLInputElement;
		const targetFiles = target.files;
		if (targetFiles) {
			setFiles(targetFiles);
			let tempFiles: File[] = [];
			for (let i = 0; i < targetFiles.length; i++) {
				const temp = targetFiles.item(i);
				if (temp) {
					tempFiles.push(temp);
				}
			}
			setFileList(tempFiles);
		}
	};

	const fetchDataInventory = async () => {
		try {
			const availableInventory = { ...inventoryParams, status: 1 };
			const response = await getAllInventoryApi(availableInventory);
			const inventoryList = response.data.data;
			setDataOptionInventory(
				inventoryList.map(v => ({
					label: `${v.name} - ${v.code}`,
					value: `${v.code}`,
				})),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataCompany = async () => {
		try {
			const response = await getAllCompanyApi(companyParams);
			const companyList = response.data.data;
			setDataOptionCompany(
				companyList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataEmployee = async () => {
		try {
			const response = await getAllEmployeeApi(employeeParams);
			const employeeList = response.data.data;
			setDataOptionEmployee(
				employeeList.map(v => ({ label: v.emp_name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataWorkflow = async () => {
		try {
			const response = await getAllWorkflowApi(workflowParams);
			const workflowList = response.data.data;
			setDataOptionWorkflow(
				workflowList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

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

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailServiceChangeApi(id);
			handleInitialValue(response.data.data);
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

	const handleInitialValue = (values: IServiceChange) => {
		setInitialValue({
			inventory_code: values.inventory_code || "",
			description: values.description || "",
			condition: values.condition || "",
			created_by: values.created_by || "",
			files: null,
			id_company: values.id_company || "",
			id_workflow: "",
			emp_name: values.emp_name || "",
			spesification: values.spesification || "",
		});
		formRef.current?.setFieldsValue({
			inventory_code: values.inventory_code || "",
			description: values.description || "",
			condition: values.condition || "",
			created_by: values.created_by || "",
			files: null,
			id_company: values.id_company || "",
			id_workflow: "",
			emp_name: values.emp_name || "",
			spesification: values.spesification || "",
		});
		setFiles(null);
		setFileList(null);
	};

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const handleApprove = (id: number) => {
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
					approveServiceChangeApi(id).then(res => {
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
			inventory_code: "",
			description: "",
			condition: "",
			created_by: "",
			files: null,
			id_company: "",
			id_workflow: "",
			emp_name: "",
			spesification: "",
		});
		setFiles(null);
		setFileList(null);
		formik.resetForm();
		formRef.current?.resetFields();
	};

	const handleReject = (id: number) => {
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
					rejectServiceChangeApi(id, { remark: result.value }).then(res => {
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

	const handleShowFile = (id: number) => {
		getDetailServiceChangeApi(id).then(res => {
			const link = res.data.data.attachment_file;
			setLinkFile(link);
			setShowModalFile(true);
		});
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
					deleteServiceChangeApi(id).then(res => {
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
			const input = {
				...values,
				files: files,
			};
			createNewServiceChangeApi(input).then(res => {
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

	// const handleDeleteFile = (id: number) => {
	// 	if (fileList?.length === 1) {
	// 		setFileList([]);
	// 	} else {
	// 		let tempFile = fileList?.splice(id, 1);
	// 		tempFile?.splice(id, 1);
	// 		setFileList(tempFile);
	// 	}
	// };

	const generateFileList = useMemo(() => {
		if (fileList?.length) {
			return (
				<List
					itemLayout="horizontal"
					dataSource={fileList.map(v => ({ fileName: v.name, size: v.size }))}
					renderItem={(item, index) => (
						<List.Item>
							<Row
								style={{
									width: "100%",
									justifyContent: "space-between",
								}}
							>
								<Col style={{ alignItems: "center", display: "flex" }}>
									<Button type="link">{item.fileName}</Button>
								</Col>
								{/* <Col style={{ alignItems: "center", display: "flex" }}>
									<DeleteOutlined onClick={() => handleDeleteFile(index)} />
								</Col> */}
							</Row>
						</List.Item>
					)}
				/>
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileList]);

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
							columns={columns({
								setShowModal,
								handleDelete,
								handleApprove,
								handleReject,
								handleShowFile,
							})}
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
									{listCheckPermission.isAllowCreateServicePerubahan && (
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
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Divider />
					<Form.Item
						name="inventory_code"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Kode Inventaris <span className="text-danger">*</span>
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
										formik.setFieldValue("inventory_code", v);
										formRef.current?.setFieldsValue({
											inventory_code: v,
										});
									}}
									value={formik.values.inventory_code}
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
							<Title level={5}>
								Deskripsi <span className="text-danger">*</span>
							</Title>
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
								Nama Pegawai <span className="text-danger">*</span>
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
										const data: any = opt;
										formik.setFieldValue("emp_name", data.label);
										formRef.current?.setFieldsValue({
											emp_name: data.label,
										});
									}}
									value={formik.values.emp_name}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="condition"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Kondisi <span className="text-danger">*</span>
							</Title>
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
					<Form.Item
						name="spesification"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Spesifikasi <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="spesification"
									className="form-control"
									placeholder="Spesifikasi"
									onChange={formik.handleChange}
									value={formik.values.spesification}
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
						name="created_by"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Dibuat oleh <span className="text-danger">*</span>
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
										formik.setFieldValue("created_by", v);
										formRef.current?.setFieldsValue({
											created_by: parseInt(v),
										});
									}}
									value={formik.values.created_by}
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
					<Form.Item name="files">
						<Button
							type="primary"
							shape="round"
							style={{ width: "100%" }}
							icon={<UploadOutlined />}
							onClick={() => {
								inputFile.current?.click();
							}}
						>
							Add File
						</Button>
						{generateFileList}
						<input
							type="file"
							style={{ display: "none" }}
							ref={inputFile}
							accept={".jpg, .jpeg, .png"}
							onChange={e => handleFile(e)}
							multiple
						/>
					</Form.Item>
				</Form>
			</AntdModal>

			<AntdModal
				title={"File"}
				open={showModalFile}
				onCancel={() => setShowModalFile(false)}
			>
				<List
					itemLayout="horizontal"
					dataSource={linkFile?.map(v => ({ link: v }))}
					renderItem={(item, index) => (
						<List.Item>
							<Row
								style={{
									width: "100%",
									justifyContent: "space-around",
								}}
							>
								<Col style={{ alignItems: "center", display: "flex" }}>
									<Button type="link" href={item.link}>{`File - ${
										index + 1
									}`}</Button>
								</Col>
								<Col style={{ alignItems: "center", display: "flex" }}>
									<Image width={100} src={item.link} />
								</Col>
							</Row>
						</List.Item>
					)}
				/>
			</AntdModal>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/>
		</MainLayout>
	);
};

export default ServiceChange;
