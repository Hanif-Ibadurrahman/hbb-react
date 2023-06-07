import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
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
	ICreateServiceRequestRequest,
	IServiceRequestGetAllParams,
	IServiceRequestPaginateResponse,
} from "store/types/serviceRequestTypes";
import {
	approveServiceRequestApi,
	createNewServiceRequestApi,
	deleteServiceRequestApi,
	getAllServiceRequestApi,
	getDetailServiceRequestApi,
	rejectServiceRequestApi,
	updateServiceRequestApi,
} from "api/serviceRequest";
import { IServiceRequest } from "store/types/serviceRequestTypes";
import { CheckResponse, TokenDekode } from "app/helper/authentication";
import { UploadOutlined } from "@ant-design/icons";
import { listCheckPermission } from "app/helper/permission";
import { DefaultOptionType } from "antd/es/select";
import { IWorkflowGetAllParams } from "store/types/workflowTypes";
import { getAllWorkflowApi, getDetailWorkflowApi } from "api/workflow";
import { ModalFilter } from "./components/modalFilter";
import {
	changeValueToRole,
	checkDefaultOption,
	removeNullFields,
} from "app/helper/common";
import { IInventoryInWarehouseParams } from "store/types/inventoryTypes";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { getAllInventoryInWarehouseApi } from "api/inventory";
import { SelectWithTag } from "app/components/selectWithTag";
import { uniqBy } from "lodash";
import { useNavigate } from "react-router-dom";

const ServiceRequest = () => {
	const tokenDecode = TokenDekode();
	const navigate = useNavigate();
	const { Title } = Typography;
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<File[] | null>(null);
	const [files, setFiles] = useState<FileList | null>(null);
	const inputFile = useRef<HTMLInputElement | null>(null);
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IServiceRequestGetAllParams | undefined>(
		{
			per_page: 10,
		},
	);
	const [inventoryInWarehouseParams, setInventoryInWarehouseParams] = useState<
		IInventoryInWarehouseParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
	const [locationParams, setLocationParams] = useState<
		ILocationGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
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
	const [initialValue, setInitialValue] =
		useState<Partial<ICreateServiceRequestRequest>>();
	const [dataTable, setDataTable] = useState<IServiceRequestPaginateResponse>();
	const [dataOptionWorkflow, setDataOptionWorkflow] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionInventoryInWarehouse, setDataOptionInventoryInWarehouse] =
		useState<DefaultOptionType[] | undefined>();
	const [dataOptionArea, setDataOptionArea] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionLocation, setDataOptionLocation] = useState<
		DefaultOptionType[] | undefined
	>();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

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

	const fetchDataArea = async () => {
		try {
			// const response = await getAllAreaApi(areaParams);
			// const areaList = response.data.data;
			// setDataOptionArea(areaList.map(v => ({ label: v.name, value: v.name })));
			const response = await getAllInventoryInWarehouseApi();
			const areaList: any[] = uniqBy(response.data.data, "area_name");
			setDataOptionArea(
				areaList.map(v => ({ label: v.area_name, value: v.area_name })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataLocation = async () => {
		try {
			// const response = await getAllLocationApi({
			// 	...locationParams,
			// 	area: formik.values.area?.toString().toLowerCase(),
			// });
			// const locationList = response.data.data;
			// setDataOptionLocation(
			// 	locationList.map(v => ({ label: v.name, value: v.name })),
			// );
			const response = await getAllInventoryInWarehouseApi({
				search: formik.values.area?.toString().toLowerCase(),
			});
			const locationList: any[] = uniqBy(response.data.data, "area_name");
			setDataOptionLocation(
				locationList.map(v => ({
					label: v.lokasi_name,
					value: v.lokasi_name,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataInventoryInWarehouse = async () => {
		try {
			const availableInventory = {
				search: formik.values.location?.toString().toLowerCase(),
			};
			const response = await getAllInventoryInWarehouseApi(availableInventory);
			const inventoryList = response.data.data;
			setDataOptionInventoryInWarehouse(
				inventoryList.map(v => ({
					label: `${v.name} - ${v.code}`,
					value: `${v.code}`,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkflow = async () => {
		try {
			const response = await getAllWorkflowApi({
				...workflowParams,
				type: "permintaan",
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

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllServiceRequestApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailServiceRequestApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	useEffect(() => {
		fetchDataInventoryInWarehouse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inventoryInWarehouseParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

	useEffect(() => {
		fetchDataWorkflow();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflowParams]);

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

	useEffect(() => {
		const area = formik.values.area;
		if (area) {
			const isInitialValueUndefined = initialValue?.area === undefined;
			if (isInitialValueUndefined || area !== initialValue.area) {
				formik.setFieldValue("location", undefined);
				formRef.current?.setFieldsValue({ location: undefined });
			}
			fetchDataLocation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.area]);

	useEffect(() => {
		const location = formik.values.location;
		if (location) {
			const isInitialValueUndefined = initialValue?.location === undefined;
			if (isInitialValueUndefined || location !== initialValue.location) {
				formik.setFieldValue("inventory_code", undefined);
				formRef.current?.setFieldsValue({ inventory_code: undefined });
			}
			fetchDataInventoryInWarehouse();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.location]);

	const handleInitialValue = (values: IServiceRequest) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionWorkflow!, setData.id_workflow)) {
			fetchDataWorkflowDetail(setData.id_workflow);
		}

		setDataOptionInventoryInWarehouse(
			dataOptionInventoryInWarehouse?.concat({
				label: `${setData.inventory_name} - ${setData.inventory_code}`,
				value: `${setData.inventory_code}`,
			}),
		);

		const input = {
			...setData,
			area: setData.area_name,
			location: setData.lokasi_name,
		};

		setInitialValue(input);
		formRef.current?.setFieldsValue(input);
		setFiles(null);
		setFileList(null);
	};

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
					approveServiceRequestApi(id, { remark: result.value })
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
		fetchDataInventoryInWarehouse();
		setShowModal({ show: true });
		setInitialValue(undefined);
		setFiles(null);
		setFileList(null);
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
					rejectServiceRequestApi(id, { remark: result.value })
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
			});
	};

	const handleShowFile = (id: number) => {
		getDetailServiceRequestApi(id).then(res => {
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
					deleteServiceRequestApi(id)
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
			files: files,
			created_by: tokenDecode?.user?.id,
			id_company: tokenDecode?.user?.id_company,
		};
		if (showModal.id) {
			updateServiceRequestApi(showModal.id, input)
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
			createNewServiceRequestApi(input)
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
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Permintaan Layanan - Permintaan"
							dataSource={dataTable}
							columns={columns({
								setShowModal,
								handleDelete,
								handleApprove,
								handleReject,
								handleShowFile,
								tokenDecode,
							})}
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
									{listCheckPermission.isAllowCreateServicePermintaan && (
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
							setSelectedPageAndSort={setSelectedPageAndSort}
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
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Divider />
					<Form.Item name="area">
						<div className="form-group">
							<Title level={5}>Area</Title>
							<div className="controls">
								<SelectWithTag
									showSearch
									onSearch={v => setAreaParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									dataOption={dataOptionArea}
									onChange={(v, opt) => {
										formik.setFieldValue("area", v.slice(0, 1));
										formRef.current?.setFieldsValue({
											area: v.slice(0, 1),
										});
									}}
									value={formik.values.area}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="location">
						<div className="form-group">
							<Title level={5}>Lokasi</Title>
							<div className="controls">
								<SelectWithTag
									showSearch
									onSearch={v => setLocationParams({ lokasi: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									dataOption={dataOptionLocation}
									onChange={(v, opt) => {
										formik.setFieldValue("location", v.slice(0, 1));
										formRef.current?.setFieldsValue({
											location: v.slice(0, 1),
										});
									}}
									value={formik.values.location}
								/>
							</div>
						</div>
					</Form.Item>
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
								No HBB/Inventaris
								<span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setInventoryInWarehouseParams({ search: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionInventoryInWarehouse}
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
					<Form.Item name="inventory_description">
						<div className="form-group">
							<Title level={5}>Deskripsi HBB/Inventaris</Title>
							<div className="controls">
								<Input
									type="text"
									name="inventory_description"
									className="form-control"
									placeholder="Deskripsi HBB/Inventaris"
									onChange={formik.handleChange}
									value={formik.values.inventory_description}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="uraian"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Uraian <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="uraian"
									className="form-control"
									placeholder="Uraian"
									onChange={formik.handleChange}
									value={formik.values.uraian}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="nama_pemakai"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Nama Pemakai Akhir <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="nama_pemakai"
									className="form-control"
									placeholder="Nama Pemakai Akhir"
									onChange={formik.handleChange}
									value={formik.values.nama_pemakai}
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
				destroyOnClose
			>
				<Row
					gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
					style={{ alignItems: "center" }}
				>
					{linkFile?.map(link => {
						return (
							<Col className="gutter-row" span={6}>
								<Image width={100} src={link} />
							</Col>
						);
					})}
				</Row>
			</AntdModal>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/>
		</>
	);
};

export default ServiceRequest;
