import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
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
import {
	ICreateServiceDeleteRequest,
	IServiceDeleteGetAllParams,
	IServiceDeletePaginateResponse,
} from "store/types/serviceDeleteTypes";
import {
	approveServiceDeleteApi,
	createNewServiceDeleteApi,
	deleteServiceDeleteApi,
	getAllConditionRequestDeleteApi,
	getAllReasonRequestDeleteApi,
	getAllServiceDeleteApi,
	getDetailServiceDeleteApi,
	rejectServiceDeleteApi,
	updateServiceDeleteApi,
} from "api/serviceDelete";
import { IServiceDelete } from "store/types/serviceDeleteTypes";
import { CheckResponse, TokenDekode } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import { getAllWorkflowApi, getDetailWorkflowApi } from "api/workflow";
import { IWorkflowGetAllParams } from "store/types/workflowTypes";
import { IInventoryGetAllParams } from "store/types/inventoryTypes";
import { getAllInventoryApi, getDetailInventoryApi } from "api/inventory";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ModalFilter } from "./components/modalFilter";
import { listCheckPermission } from "app/helper/permission";
import {
	changeValueToRole,
	checkDefaultOption,
	removeNullFields,
} from "app/helper/common";
import ModalDetail from "../components/modalDetail";
import { useNavigate } from "react-router-dom";

const ServiceDelete = () => {
	dayjs.extend(customParseFormat);
	const navigate = useNavigate();
	const tokenDecode = TokenDekode();
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IServiceDeleteGetAllParams | undefined>({
		per_page: 10,
	});
	const [inventoryParams, setInventoryParams] = useState<
		IInventoryGetAllParams | undefined
	>();
	const [workflowParams, setWorkflowParams] = useState<
		IWorkflowGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [showModalDetail, setShowModalDetail] = useState<{
		show: boolean;
		id?: number;
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
		useState<Partial<ICreateServiceDeleteRequest>>();
	const [dataTable, setDataTable] = useState<IServiceDeletePaginateResponse>();
	const [dataOptionInventory, setDataOptionInventory] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkflow, setDataOptionWorkflow] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCondition, setDataOptionCondition] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionReason, setDataOptionReason] = useState<
		DefaultOptionType[] | undefined
	>();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const handleSelectedRow = record => {
		setShowModalDetail({ show: true, id: record.id_inventory });
	};

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllServiceDeleteApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailServiceDeleteApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataInventory = async () => {
		try {
			const availableInventory = {
				...inventoryParams,
				status: 1,
				inventory_type: formik.values.inventory_type,
			};
			const response = await getAllInventoryApi(availableInventory);
			const inventoryList = response.data.data.data;
			setDataOptionInventory(
				inventoryList.map(v => ({
					label: `${v.name} - ${v.code}`,
					value: v.id,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataInventoryDetail = async (id: number) => {
		try {
			if (id) {
				const response = await getDetailInventoryApi(id);
				const detail = response.data.data;
				setDataOptionInventory(
					dataOptionInventory?.concat({
						label: `${detail.name} - ${detail.code}`,
						value: detail.id,
					}),
				);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkflow = async () => {
		try {
			const response = await getAllWorkflowApi({
				...workflowParams,
				type: "penghapusan",
			});
			const workflowList = response.data.data.data;
			setDataOptionWorkflow(
				workflowList.map(v => ({
					label: `${v.name} [${changeValueToRole(v.roles)}]`,
					value: v.id,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkflowDetail = async (id: number) => {
		try {
			if (id) {
				const response = await getDetailWorkflowApi(id);
				const detail = response.data.data;
				setDataOptionWorkflow(
					dataOptionWorkflow?.concat({
						label: `${detail.name} [${changeValueToRole(detail.roles)}]`,
						value: detail.id,
					}),
				);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCondition = async () => {
		try {
			const response = await getAllConditionRequestDeleteApi();
			const conditionList = response.data.data;
			setDataOptionCondition(
				conditionList.map(v => ({
					label: v.name,
					value: v.name,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataReason = async () => {
		try {
			const response = await getAllReasonRequestDeleteApi();
			const reasonList = response.data.data;
			setDataOptionReason(
				reasonList.map(v => ({
					label: v.name,
					value: v.name,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const handleInitialValue = (values: IServiceDelete) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionInventory!, setData.inventory_code)) {
			fetchDataInventoryDetail(setData.id_inventory);
		}
		if (!checkDefaultOption(dataOptionWorkflow!, setData.id_workflow)) {
			fetchDataWorkflowDetail(setData.id_workflow);
		}
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
	};

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		fetchDataInventory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inventoryParams]);

	useEffect(() => {
		fetchDataWorkflow();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflowParams]);

	useEffect(() => {
		fetchDataCondition();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchDataReason();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	useEffect(() => {
		const type = formik.values.inventory_type;
		if (type) {
			const isInitialValueUndefined =
				initialValue?.inventory_type === undefined;
			if (isInitialValueUndefined || type !== initialValue.inventory_type) {
				formik.setFieldValue("id_inventory", undefined);
				formRef.current?.setFieldsValue({ id_inventory: undefined });
			}
			fetchDataInventory();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.inventory_type]);

	const handleApprove = (id: number, record: any) => {
		const swalCustom = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success m-1",
				cancelButton: "btn btn-danger m-1",
			},
			buttonsStyling: false,
		});

		swalCustom
			.fire({
				title: "Apakah anda yakin ingin menyetujui permintaan ini?",
				text: "Ada catatan?",
				input: "text",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Approve",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					approveServiceDeleteApi(id, { remark: result.value })
						.then(res => {
							if (res.data.status === "success") {
								swalCustom.fire(
									"Approve",
									"Data ini telah disetujui.",
									"success",
								);
								const isLastFlow: boolean =
									record.total_flow - 1 === record.current_flow;
								if (isLastFlow) {
									navigate("/riwayat-tiket-layanan", { replace: true });
								} else {
									fetchDataList();
								}
							} else {
								swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
							}
						})
						.catch((error: any) => {
							CheckResponse(error);
						});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Permintaan ini batal disetujui", "error");
				}
			});
	};

	const handleAdd = () => {
		setShowModal({ show: true });
		setInitialValue(undefined);
		formik.resetForm();
		form.resetFields();
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
				inputAttributes: {
					required: "true",
				},
				validationMessage: "Harap isi alasan penolakan",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Reject",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					rejectServiceDeleteApi(id, { remark: result.value })
						.then(res => {
							if (res.data.status === "success") {
								swalCustom.fire(
									"Reject",
									"Permintaan ini telah direject.",
									"success",
								);
								navigate("/riwayat-tiket-layanan", { replace: true });
							} else {
								swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
							}
						})
						.catch((error: any) => {
							CheckResponse(error);
						});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Permintaan ini batal direject", "error");
				}
			})
			.catch((error: any) => {
				Swal.fire({
					icon: "error",
					title: error.response.data.message,
					showConfirmButton: false,
					timer: 3000,
				});
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
					deleteServiceDeleteApi(id)
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
		const input = {
			...values,
			created_by: tokenDecode?.user?.id,
			id_company: tokenDecode?.user?.id_company,
		};
		if (showModal.id) {
			updateServiceDeleteApi(showModal.id, input)
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
			createNewServiceDeleteApi(input)
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
					fetchDataInventory();
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
							title="Permintaan Layanan - Penghapusan"
							dataSource={dataTable}
							columns={columns({
								setShowModal,
								handleDelete,
								handleApprove,
								handleReject,
								tokenDecode,
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
									{listCheckPermission.isAllowCreateServicePenghapusan && (
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
							handleSelectedRow={handleSelectedRow}
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
				destroyOnClose
			>
				<div className="col-12">
					<Form form={form} ref={formRef} onFinish={onFinish}>
						<Divider />
						<Form.Item name="inventory_type">
							<div className="form-group">
								<Title level={5}>Jenis Barang</Title>
								<div className="controls">
									<Select
										options={[
											{ value: 1, label: "Inventaris" },
											{ value: 2, label: "HBB" },
										]}
										onChange={(v, opt) => {
											formik.setFieldValue("inventory_type", v);
											formRef.current?.setFieldsValue({
												inventory_type: v,
											});
										}}
										value={formik.values.inventory_type}
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
									No HBB/Inventaris <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										showSearch
										onSearch={v => setInventoryParams({ search: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionInventory}
										onChange={(v, opt) => {
											formik.setFieldValue("id_inventory", v);
											formRef.current?.setFieldsValue({
												id_inventory: v,
											});
										}}
										value={formik.values.id_inventory}
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
									<Select
										options={dataOptionCondition}
										onChange={(v, opt) => {
											formik.setFieldValue("condition", v);
											formRef.current?.setFieldsValue({
												condition: v,
											});
										}}
										value={formik.values.condition}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="reason"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<Title level={5}>
									Alasan <span className="text-danger">*</span>
								</Title>
								<div className="controls">
									<Select
										options={dataOptionReason}
										onChange={(v, opt) => {
											formik.setFieldValue("reason", v);
											formRef.current?.setFieldsValue({
												reason: v,
											});
										}}
										value={formik.values.reason}
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
												id_workflow: v,
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

			<ModalDetail
				showModal={showModalDetail}
				setShowModal={setShowModalDetail}
			/>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/>
		</>
	);
};

export default ServiceDelete;
