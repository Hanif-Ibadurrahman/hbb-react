import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	createNewWorkflowApi,
	deleteWorkflowApi,
	getAllWorkflowApi,
	getDetailWorkflowApi,
	updateWorkflowApi,
} from "api/workflow";
import {
	IWorkflow,
	IWorkflowGetAllParams,
	IWorkflowPaginateResponse,
	ICreateWorkflowRequest,
} from "store/types/workflowTypes";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Radio,
	RadioChangeEvent,
	Select,
	Space,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { CheckResponse } from "app/helper/authentication";
import { ModalFilter } from "./components/modalFilter";
import { DefaultOptionType } from "antd/es/select";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
	isSuperadminGlobal,
	listCheckPermission,
	tokenDecode,
} from "app/helper/permission";
import {
	checkDefaultOption,
	removeNullFields,
	valueAndLabelRole,
} from "app/helper/common";

const MasterWorkflow = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IWorkflowGetAllParams | undefined>({
		per_page: 10,
	});
	const [paramsFilter, setParamsFilter] = useState<
		IWorkflowGetAllParams | undefined
	>();
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
		useState<Partial<ICreateWorkflowRequest>>();
	const [dataTable, setDataTable] = useState<IWorkflowPaginateResponse>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionRole, setDataOptionRole] = useState<
		DefaultOptionType[] | undefined
	>(valueAndLabelRole);

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllWorkflowApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailWorkflowApi(id);
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
				companyList.map(v => ({ label: v.name, value: `${v.id}` })),
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

	const handleInitialValue = (values: IWorkflow) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionCompany!, setData.id_company)) {
			fetchDataCompanyDetail(setData.id_company);
		}
		setInitialValue({
			...setData,
			roles: values.roles?.split(",").map(Number),
		});
		formRef.current?.setFieldsValue({
			...setData,
			roles: values.roles?.split(",").map(Number),
		});
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
					deleteWorkflowApi(id)
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
			updateWorkflowApi(showModal.id, values)
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
			createNewWorkflowApi(values)
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
							title="Workflow"
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
									{listCheckPermission.isAllowCreateMasterWorkflow && (
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
				width={900}
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
								Nama Workflow <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									onChange={formik.handleChange}
									value={formik.values.name}
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
									onChange={formik.handleChange}
									value={formik.values.description}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="type"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Tipe Workflow <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									options={[
										{ value: "permintaan", label: "Permintaan" },
										{ value: "perbaikan", label: "Perbaikan" },
										{ value: "pengembalian", label: "Pengembalian" },
										{ value: "penggantian", label: "Penggantian" },
										{ value: "perubahan", label: "Perubahan" },
										{ value: "pemeriksaan", label: "Pemeriksaan" },
										{ value: "penghapusan", label: "Penghapusan" },
									]}
									onChange={(v, opt) => {
										formik.setFieldValue("type", v);
										formRef.current?.setFieldsValue({
											type: v,
										});
									}}
									value={formik.values.type}
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
								Roles <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Form.List name="roles">
									{(fields, { add, remove }) => (
										<>
											{fields.map(field => (
												<Space
													key={field.key}
													align="baseline"
													style={{
														width: "50%",
													}}
												>
													<Form.Item
														{...field}
														label={"Role"}
														rules={[
															{
																required: true,
																message: "Harap isi field ini",
															},
														]}
													>
														<Select
															options={dataOptionRole}
															style={{ width: 180 }}
														/>
													</Form.Item>
													<MinusCircleOutlined
														onClick={() => remove(field.name)}
													/>
												</Space>
											))}

											<Form.Item>
												<Button
													type="dashed"
													onClick={() => add()}
													block
													icon={<PlusOutlined />}
												>
													Add roles
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="is_reverse"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<Title level={5}>
							Reverse <span className="text-danger">*</span>
						</Title>
						<Radio.Group
							options={[
								{ label: "Yes", value: 1 },
								{ label: "No", value: 0 },
							]}
							onChange={(e: RadioChangeEvent) => {
								const v = e.target.value;
								formik.setFieldValue("is_reverse", v);
								formRef.current?.setFieldsValue({
									is_reverse: v,
								});
							}}
							value={formik.values.is_reverse}
							optionType="button"
							buttonStyle="solid"
						/>
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

export default MasterWorkflow;
