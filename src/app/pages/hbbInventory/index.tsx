import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MainLayout } from "app/layout/mainLayout";
import { TableSelectionPaginateAndSort } from "app/components/table/antd/tableSelectionPaginateAndSort";
import { useEffect, useState, useRef } from "react";
import {
	Modal as AntdModal,
	Button,
	DatePicker,
	Divider,
	Form,
	FormInstance,
	Input,
	InputNumber,
	Select,
	Space,
	Tabs,
	TabsProps,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { CheckAuthentication } from "app/helper/authentication";
import { columns } from "./components/table/columnAndDataType";
import {
	ICreateInventoryRequest,
	IInventory,
	IInventoryDetail,
	IInventoryGetAllParams,
} from "store/types/inventoryTypes";
import {
	createNewInventoryApi,
	deleteInventoryApi,
	getAllInventoryApi,
	getDetailInventoryApi,
	updateInventoryApi,
} from "api/inventory";
import { ModalFilter } from "./components/modalFilter";
import { DefaultOptionType } from "antd/es/select";
import { ICodeGroupGetAllParams } from "store/types/codeGroupTypes";
import { ISubCodeGroupGetAllParams } from "store/types/subCodeGroupTypes";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { IItemGetAllParams } from "store/types/itemTypes";
import { getAllCodeGroupApi } from "api/codeGroup";
import { getAllSubCodeGroupApi } from "api/subCodeGroup";
import { getAllCompanyApi } from "api/company";
import { IColorGetAllParams } from "store/types/colorTypes";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { getAllEmployeeApi } from "api/employee";
import { getAllBusinessUnitApi } from "api/businessUnit";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { getAllColorApi } from "api/color";
import { getAllLocationApi } from "api/location";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllAreaApi } from "api/area";
import { getAllWorkUnitApi } from "api/workUnit";
import { getAllItemApi } from "api/item";
import { IConditionGetAllParams } from "store/types/conditionTypes";
import { getAllConditionApi } from "api/condition";
import { getAllCountryApi } from "api/country";
import { ICountryGetAllParams } from "store/types/countryTypes";
import { removeNullFields } from "app/helper/common";

const HbbInventory = () => {
	dayjs.extend(customParseFormat);
	const { Title } = Typography;
	const { TextArea } = Input;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IInventoryGetAllParams | undefined>({
		per_page: 10,
	});
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [codeGroupParams, setCodeGroupParams] = useState<
		ICodeGroupGetAllParams | undefined
	>();
	const [subCodeGroupParams, setSubCodeGroupParams] = useState<
		ISubCodeGroupGetAllParams | undefined
	>();
	const [businessUnitParams, setBusinessUnitParams] = useState<
		IBusinessUnitGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [countryParams, setCountryParams] = useState<
		ICountryGetAllParams | undefined
	>();
	const [conditionParams, setConditionParams] = useState<
		IConditionGetAllParams | undefined
	>();
	const [employeeParams, setEmployeeParams] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [colorParams, setColorParams] = useState<
		IColorGetAllParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
	const [workUnitParams, setWorkUnitParams] = useState<
		IWorkUnitGetAllParams | undefined
	>();
	const [locationParams, setLocationParams] = useState<
		ILocationGetAllParams | undefined
	>();
	const [itemParams, setItemParams] = useState<IItemGetAllParams | undefined>();
	const [selectedRow, setSelectedRow] = useState<any[]>([]);
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [initialValue, setInitialValue] =
		useState<Partial<ICreateInventoryRequest>>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionCodeGroup, setDataOptionCodeGroup] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionSubCodeGroup, setDataOptionSubCodeGroup] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCountry, setDataOptionCountry] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionItem, setDataOptionItem] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionColor, setDataOptionColor] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionEmployee, setDataOptionEmployee] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionLocation, setDataOptionLocation] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionCondition, setDataOptionCondition] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionArea, setDataOptionArea] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkUnit, setDataOptionWorkUnit] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllInventoryApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailInventoryApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataCodeGroup = async () => {
		try {
			const response = await getAllCodeGroupApi(codeGroupParams);
			const codeGroupList = response.data.data.data;
			setDataOptionCodeGroup(
				codeGroupList.map(v => ({ label: v.value, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataSubCodeGroup = async (id: number) => {
		try {
			const response = await getAllSubCodeGroupApi(id, subCodeGroupParams);
			const areaList = response.data.data.data;
			setDataOptionSubCodeGroup(
				areaList.map(v => ({ label: v.value, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataCountry = async () => {
		try {
			const response = await getAllCountryApi(countryParams);
			const countryList = response.data.data.data;
			setDataOptionCountry(
				countryList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataEmployee = async () => {
		try {
			const response = await getAllEmployeeApi(employeeParams);
			const employeeList = response.data.data.data;
			setDataOptionEmployee(
				employeeList.map(v => ({ label: v.emp_name, value: `${v.nipg}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataItem = async () => {
		try {
			const response = await getAllItemApi(itemParams);
			const itemList = response.data.data.data;
			setDataOptionItem(
				itemList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataCondition = async () => {
		try {
			const response = await getAllConditionApi(conditionParams);
			const conditionList = response.data.data.data;
			setDataOptionCondition(
				conditionList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi(locationParams);
			const locationList = response.data.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataColor = async () => {
		try {
			const response = await getAllColorApi(colorParams);
			const colorList = response.data.data.data;
			setDataOptionColor(
				colorList.map(v => ({ label: v.name, value: `${v.id}` })),
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

	const handleInitialValue = (values: IInventoryDetail) => {
		const setData = removeNullFields(values);
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
	};

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	useEffect(() => {
		fetchDataCountry();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

	useEffect(() => {
		fetchDataWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

	useEffect(() => {
		fetchDataItem();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataCondition();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

	useEffect(() => {
		if (showModal.show && showModal.id) {
			fetchDataDetail(showModal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	useEffect(() => {
		fetchDataCodeGroup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codeGroupParams]);

	useEffect(() => {
		const mainGroupId = formik.values.id_main_group;
		if (mainGroupId) {
			fetchDataSubCodeGroup(mainGroupId);
		}

		if (!showModal.id && showModal.show) {
			setInitialValue({
				...initialValue,
				id_sub_group: undefined,
			});
			formik.setFieldValue("id_sub_group", undefined);
			formRef.current?.setFieldsValue({
				id_sub_group: undefined,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subCodeGroupParams, formik.values.id_main_group]);

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
		fetchDataEmployee();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeParams]);

	useEffect(() => {
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessUnitParams]);

	const handleAdd = () => {
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
					deleteInventoryApi(id).then(res => {
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
			updateInventoryApi(showModal.id, values).then(res => {
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
			createNewInventoryApi(values).then(res => {
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

	const itemTab: TabsProps["items"] = [
		{
			key: "1",
			label: `Informasi Umum`,
			children: (
				<>
					<Form.Item
						name="inventory_type"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Jenis Barang <span className="text-danger">*</span>
							</Title>
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
									onSearch={v => setCodeGroupParams({ value: v })}
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
									onSearch={v => setSubCodeGroupParams({ value: v })}
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
						name="id_location"
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
								<Select
									showSearch
									onSearch={v => setLocationParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionLocation}
									onChange={(v, opt) => {
										formik.setFieldValue("id_location", v);
										formRef.current?.setFieldsValue({
											id_location: v,
										});
									}}
									value={formik.values.id_location}
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
											id_satker: v,
										});
									}}
									value={formik.values.id_satker}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_barang"
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
								<Select
									showSearch
									onSearch={v => setItemParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionItem}
									onChange={(v, opt) => {
										formik.setFieldValue("id_barang", v);
										formRef.current?.setFieldsValue({
											id_barang: v,
										});
									}}
									value={formik.values.id_barang}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="serial_no"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Nomor Urut <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="serial_no"
									className="form-control"
									placeholder="Nomor Urut"
									onChange={formik.handleChange}
									value={formik.values.serial_no}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="year"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Tahun Perolehan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<DatePicker
									className="form-control"
									picker="year"
									onChange={(value, dateString) => {
										formik.setFieldValue("year", dateString);
										formRef.current?.setFieldsValue({
											year: dateString,
										});
									}}
									value={
										formik.values.year
											? dayjs(formik.values.year, "YYYY")
											: undefined
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="price"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Harga Perolehan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<InputNumber
									addonBefore="Rp"
									name="price"
									style={{ width: "100%" }}
									onKeyPress={e => {
										if (!/\d+/.test(e.key)) {
											e.preventDefault();
										}
									}}
									// formatter={value =>
									// 	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									// }
									// parser={value => value!.replace(/\$\s?|(,*)/g, "")}
									onChange={v => {
										const nilai: any = v;
										formik.setFieldValue("price", nilai);
										formRef.current?.setFieldsValue({
											price: parseInt(nilai),
										});
									}}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="jumlah"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Jumlah <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<InputNumber
									min={1}
									style={{ width: "100%" }}
									onKeyPress={e => {
										if (!/\d+/.test(e.key)) {
											e.preventDefault();
										}
									}}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_country"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Negara Pembuat <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setCountryParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionCountry}
									onChange={(v, opt) => {
										formik.setFieldValue("id_country", v);
										formRef.current?.setFieldsValue({
											id_country: v,
										});
									}}
									value={formik.values.id_country}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="year_made"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Tahun Pembuatan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<DatePicker
									className="form-control"
									picker="year"
									onChange={(value, dateString) => {
										formik.setFieldValue("year_made", dateString);
										formRef.current?.setFieldsValue({
											year_made: dateString,
										});
									}}
									value={
										formik.values.year_made
											? dayjs(formik.values.year_made, "YYYY")
											: undefined
									}
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
									showSearch
									onSearch={v => setConditionParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionCondition}
									onChange={(v, opt) => {
										formik.setFieldValue("condition", v);
										formRef.current?.setFieldsValue({
											condition: parseInt(v),
										});
									}}
									value={formik.values.condition}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_color"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Warna <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setColorParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionColor}
									onChange={(v, opt) => {
										formik.setFieldValue("id_color", v);
										formRef.current?.setFieldsValue({
											id_color: v,
										});
									}}
									value={formik.values.id_color}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="id_penanggung_jawab"
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
										formik.setFieldValue("id_penanggung_jawab", v);
										formRef.current?.setFieldsValue({
											id_penanggung_jawab: v,
										});
									}}
									value={formik.values.id_penanggung_jawab}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
		{
			key: "2",
			label: `Detail`,
			children: (
				<>
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
					<Form.Item name="type">
						<div className="form-group">
							<Title level={5}>Tipe</Title>
							<div className="controls">
								<Input
									type="text"
									name="type"
									className="form-control"
									placeholder="Tipe"
									onChange={formik.handleChange}
									value={formik.values.type}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="size">
						<div className="form-group">
							<Title level={5}>Ukuran</Title>
							<div className="controls">
								<Input
									type="text"
									name="size"
									className="form-control"
									placeholder="Ukuran"
									onChange={formik.handleChange}
									value={formik.values.size}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_akuntansi">
						<div className="form-group">
							<Title level={5}>Nomor Akuntansi</Title>
							<div className="controls">
								<Input
									type="text"
									name="no_akuntansi"
									className="form-control"
									placeholder="Nomor Akuntansi"
									onChange={formik.handleChange}
									value={formik.values.no_akuntansi}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_bast">
						<div className="form-group">
							<Title level={5}>Nomor BAST/DO</Title>
							<div className="controls">
								<Input
									type="text"
									name="no_bast"
									className="form-control"
									placeholder="Nomor BATS/DO"
									onChange={formik.handleChange}
									value={formik.values.no_bast}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="serial_number">
						<div className="form-group">
							<Title level={5}>Nomor Seri</Title>
							<div className="controls">
								<Input
									type="text"
									name="serial_number"
									className="form-control"
									placeholder="Nomor Seri"
									onChange={formik.handleChange}
									value={formik.values.serial_number}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_polisi">
						<div className="form-group">
							<Title level={5}>Nomor Polisi</Title>
							<div className="controls">
								<Input
									type="text"
									name="no_polisi"
									className="form-control"
									placeholder="Nomor Polisi"
									onChange={formik.handleChange}
									value={formik.values.no_polisi}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_rangka">
						<div className="form-group">
							<Title level={5}>Nomor Rangka</Title>
							<div className="controls">
								<Input
									type="text"
									name="no_rangka"
									className="form-control"
									placeholder="Nomor Rangka"
									onChange={formik.handleChange}
									value={formik.values.no_rangka}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_mesin">
						<div className="form-group">
							<Title level={5}>Nomor Mesin</Title>
							<div className="controls">
								<Input
									type="text"
									name="no_mesin"
									className="form-control"
									placeholder="Nomor Mesin"
									onChange={formik.handleChange}
									value={formik.values.no_mesin}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_bpkb">
						<div className="form-group">
							<Title level={5}>Nomor BPKB</Title>
							<div className="controls">
								<Input
									type="text"
									name="no_bpkb"
									className="form-control"
									placeholder="Nomor BPKB"
									onChange={formik.handleChange}
									value={formik.values.no_bpkb}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="remark">
						<div className="form-group">
							<Title level={5}>Keterangan</Title>
							<div className="controls">
								<TextArea
									rows={3}
									name="remark"
									className="form-control"
									placeholder="Keterangan"
									onChange={formik.handleChange}
									value={formik.values.remark}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
		{
			key: "3",
			label: `Kontak`,
			children: (
				<>
					<Form.Item name="distributor">
						<div className="form-group">
							<Title level={5}>Distributor</Title>
							<div className="controls">
								<Input
									type="text"
									name="distributor"
									className="form-control"
									placeholder="Distributor"
									onChange={formik.handleChange}
									value={formik.values.distributor}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="contract_no">
						<div className="form-group">
							<Title level={5}>Nomor Kontak</Title>
							<div className="controls">
								<Input
									type="text"
									name="contract_no"
									className="form-control"
									placeholder="Nomor Akuntansi"
									onChange={formik.handleChange}
									value={formik.values.contract_no}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="contract_date">
						<div className="form-group">
							<Title level={5}>Tanggal Kontrak</Title>
							<div className="controls">
								<DatePicker
									className="form-control"
									onChange={(value, dateString) => {
										formik.setFieldValue("contract_date", dateString);
										formRef.current?.setFieldsValue({
											contract_date: dateString,
										});
									}}
									format={"YYYY-MM-DD"}
									value={
										formik.values.contract_date
											? dayjs(formik.values.contract_date, "YYYY-MM-DD")
											: undefined
									}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
	];

	const handleCancel = () => {
		setShowModal({ show: false });
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TableSelectionPaginateAndSort
							title={"HBB dan Inventaris"}
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
									<button
										type="button"
										className="btn"
										disabled={!selectedRow.length}
										style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
									>
										Hapus
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={handleAdd}
									>
										Tambah
									</button>
								</Space>
							}
							columns={columns({ setShowModal, handleDelete })}
							rowKey={"id"}
							dataSource={dataTable}
							setSelectedRow={setSelectedRow}
							setSelectedPageAndSort={setSelectedPageAndSort}
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
					<Tabs defaultActiveKey="1" items={itemTab} />
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

export default HbbInventory;
