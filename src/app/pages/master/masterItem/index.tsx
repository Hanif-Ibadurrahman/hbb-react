import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ICreateItemRequest,
	IItem,
	IItemGetAllParams,
} from "store/types/itemTypes";
import {
	createNewItemApi,
	deleteItemApi,
	getAllItemApi,
	getDetailItemApi,
	updateItemApi,
} from "api/item";
import { CheckResponse } from "app/helper/authentication";
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
import { DefaultOptionType } from "antd/es/select";
import { ICodeGroupGetAllParams } from "store/types/codeGroupTypes";
import { ISubCodeGroupGetAllParams } from "store/types/subCodeGroupTypes";
import { getAllCodeGroupApi, getDetailCodeGroupApi } from "api/codeGroup";
import {
	getAllSubCodeGroupApi,
	getDetailSubCodeGroupApi,
} from "api/subCodeGroup";
import { useFormik } from "formik";
import { getAllColorApi, getDetailColorApi } from "api/color";
import { IColorGetAllParams } from "store/types/colorTypes";
import { ModalFilter } from "./components/modalFilter";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";
import {
	isSuperadminGlobal,
	listCheckPermission,
	tokenDecode,
} from "app/helper/permission";
import { checkDefaultOption, removeNullFields } from "app/helper/common";
import { isUndefined } from "lodash";

const MasterItem = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IItemGetAllParams | undefined>({
		per_page: 10,
	});
	const [paramsFilter, setParamsFilter] = useState<
		IItemGetAllParams | undefined
	>();
	const [codeGroupParams, setCodeGroupParams] = useState<
		ICodeGroupGetAllParams | undefined
	>();
	const [subCodeGroupParams, setSubCodeGroupParams] = useState<
		ISubCodeGroupGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [colorParams, setColorParams] = useState<
		IColorGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [initialValue, setInitialValue] =
		useState<Partial<ICreateItemRequest>>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionCodeGroup, setDataOptionCodeGroup] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionSubCodeGroup, setDataOptionSubCodeGroup] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionColor, setDataOptionColor] = useState<
		DefaultOptionType[] | undefined
	>();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailItemApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCodeGroup = async () => {
		try {
			const response = await getAllCodeGroupApi({
				...codeGroupParams,
				id_company: formik.values.id_company,
			});
			const codeGroupList = response.data.data;
			setDataOptionCodeGroup(
				codeGroupList.map(v => ({ label: v.value, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCodeGroupDetail = async (id: number) => {
		try {
			const response = await getDetailCodeGroupApi(id);
			const detail = response.data.data;
			setDataOptionCodeGroup(
				dataOptionCodeGroup?.concat({ label: detail.value, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataSubCodeGroup = async (id: number) => {
		try {
			const response = await getAllSubCodeGroupApi(id, {
				...subCodeGroupParams,
				id_company: formik.values.id_company,
			});
			const subGroupList = response.data.data;
			setDataOptionSubCodeGroup(
				subGroupList.map(v => ({ label: v.value, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataSubCodeGroupDetail = async (id: number) => {
		try {
			const response = await getDetailSubCodeGroupApi(id);
			const detail = response.data.data;
			setDataOptionSubCodeGroup(
				dataOptionSubCodeGroup?.concat({
					label: detail.value,
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

	const fetchDataColor = async () => {
		try {
			const response = await getAllColorApi({
				...colorParams,
				id_company: formik.values.id_company,
			});
			const colorList = response.data.data;
			setDataOptionColor(
				colorList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataColorDetail = async (id: number) => {
		try {
			const response = await getDetailColorApi(id);
			const detail = response.data.data;
			setDataOptionColor(
				dataOptionColor?.concat({ label: detail.name, value: `${detail.id}` }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllItemApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const handleInitialValue = (values: IItem) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionCodeGroup!, setData.id_main_group)) {
			fetchDataCodeGroupDetail(setData.id_main_group);
		}
		if (!checkDefaultOption(dataOptionSubCodeGroup!, setData.id_sub_group)) {
			fetchDataSubCodeGroupDetail(setData.id_sub_group);
		}
		if (!checkDefaultOption(dataOptionCompany!, setData.id_company)) {
			fetchDataCompanyDetail(setData.id_company);
		}
		if (!checkDefaultOption(dataOptionColor!, setData.warna)) {
			fetchDataColorDetail(setData.warna);
		}
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
	};

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		fetchDataCodeGroup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codeGroupParams]);

	useEffect(() => {
		const mainGroupId = formik.values.id_main_group;
		if (mainGroupId && initialValue?.id_main_group) {
			if (mainGroupId !== initialValue.id_main_group) {
				formik.setFieldValue("id_sub_group", undefined);
				formRef.current?.setFieldsValue({
					id_sub_group: undefined,
				});
			}
			fetchDataSubCodeGroup(mainGroupId);
		}
		if (mainGroupId && isUndefined(initialValue?.id_main_group)) {
			fetchDataSubCodeGroup(mainGroupId);
			formik.setFieldValue("id_sub_group", undefined);
			formRef.current?.setFieldsValue({
				id_sub_group: undefined,
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_main_group]);

	useEffect(() => {
		const mainGroupId = formik.values.id_main_group;
		if (mainGroupId) {
			fetchDataSubCodeGroup(mainGroupId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subCodeGroupParams]);

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

	useEffect(() => {
		fetchDataColor();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colorParams]);

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
			const isUndefinedCompanyId = initialValue?.id_company === undefined;
			if (isUndefinedCompanyId || companyId !== initialValue.id_company) {
				formik.setFieldValue("id_main_group", undefined);
				formRef.current?.setFieldsValue({ id_main_group: undefined });
				formik.setFieldValue("warna", undefined);
				formRef.current?.setFieldsValue({ warna: undefined });
			}
			fetchDataCodeGroup();
			fetchDataColor();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_company]);

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
					deleteItemApi(id)
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
			updateItemApi(showModal.id, values)
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
			createNewItemApi(values)
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
							title="Barang"
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
									{listCheckPermission.isAllowCreateMasterItem && (
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
						name="id_main_group"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Main Group <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setCodeGroupParams({ group: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionCodeGroup}
									onChange={(v, opt) => {
										formik.setFieldValue("id_main_group", v);
										formRef.current?.setFieldsValue({
											id_main_group: v,
										});
									}}
									value={formik.values.id_main_group}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_sub_group"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Sub Group <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setSubCodeGroupParams({ group: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionSubCodeGroup}
									onChange={(v, opt) => {
										formik.setFieldValue("id_sub_group", v);
										formRef.current?.setFieldsValue({
											id_sub_group: v,
										});
									}}
									value={formik.values.id_sub_group}
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
								Nama Barang <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nama Barang"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="merk">
						<div className="form-group">
							<Title level={5}>Merk</Title>
							<div className="controls">
								<Input
									type="text"
									name="merk"
									className="form-control"
									placeholder="Merk"
									onChange={formik.handleChange}
									value={formik.values.merk}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="tipe">
						<div className="form-group">
							<Title level={5}>Tipe</Title>
							<div className="controls">
								<Input
									type="text"
									name="tipe"
									className="form-control"
									placeholder="Tipe"
									onChange={formik.handleChange}
									value={formik.values.tipe}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="jenis">
						<div className="form-group">
							<Title level={5}>Jenis</Title>
							<div className="controls">
								<Input
									type="text"
									name="jenis"
									className="form-control"
									placeholder="Jenis"
									onChange={formik.handleChange}
									value={formik.values.jenis}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="model">
						<div className="form-group">
							<Title level={5}>Model</Title>
							<div className="controls">
								<Input
									type="text"
									name="model"
									className="form-control"
									placeholder="Model"
									onChange={formik.handleChange}
									value={formik.values.model}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="warna">
						<div className="form-group">
							<Title level={5}>Warna</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setColorParams({ color: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionColor}
									onChange={(v, opt) => {
										formik.setFieldValue("warna", v);
										formRef.current?.setFieldsValue({
											warna: v,
										});
									}}
									value={formik.values.warna}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="kapasitas">
						<div className="form-group">
							<Title level={5}>Kapasitas</Title>
							<div className="controls">
								<Input
									type="text"
									name="kapasitas"
									className="form-control"
									placeholder="Kapasitas"
									onChange={formik.handleChange}
									value={formik.values.kapasitas}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="ukuran">
						<div className="form-group">
							<Title level={5}>Ukuran</Title>
							<div className="controls">
								<Input
									type="text"
									name="ukuran"
									className="form-control"
									placeholder="Ukuran"
									onChange={formik.handleChange}
									value={formik.values.ukuran}
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
					setDataOptionCodeGroup,
					setDataOptionSubCodeGroup,
					setDataOptionColor,
					setDataOptionCompany,
				}}
				options={{
					dataOptionCodeGroup,
					dataOptionSubCodeGroup,
					dataOptionColor,
					dataOptionCompany,
				}}
			/>
		</>
	);
};

export default MasterItem;
