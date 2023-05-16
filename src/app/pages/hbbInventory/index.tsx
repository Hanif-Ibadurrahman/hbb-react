import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TableSelectionPaginateAndSort } from "app/components/table/antd/tableSelectionPaginateAndSort";
import { useEffect, useState, useRef, SyntheticEvent, useMemo } from "react";
import {
	Modal as AntdModal,
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	FormInstance,
	Image,
	Input,
	InputNumber,
	List,
	Row,
	Select,
	Space,
	Tabs,
	TabsProps,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { CheckResponse } from "app/helper/authentication";
import { columns } from "./components/table/columnAndDataType";
import {
	ICheckSerialNumberParams,
	ICreateInventoryRequest,
	IInventoryDetail,
	IInventoryGetAllParams,
} from "store/types/inventoryTypes";
import {
	createNewInventoryApi,
	deleteInventoryApi,
	getAllInventoryApi,
	getDetailInventoryApi,
	getSerialNumberApi,
	updateInventoryApi,
} from "api/inventory";
import { ModalFilter } from "./components/modalFilter";
import { DefaultOptionType } from "antd/es/select";
import { ICodeGroupGetAllParams } from "store/types/codeGroupTypes";
import { ISubCodeGroupGetAllParams } from "store/types/subCodeGroupTypes";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { IItemGetAllParams } from "store/types/itemTypes";
import { getAllCodeGroupApi, getDetailCodeGroupApi } from "api/codeGroup";
import {
	getAllSubCodeGroupApi,
	getDetailSubCodeGroupApi,
} from "api/subCodeGroup";
import { getAllCompanyApi, getDetailCompanyApi } from "api/company";
import { IColorGetAllParams } from "store/types/colorTypes";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { getAllEmployeeApi, getDetailEmployeeApi } from "api/employee";
import {
	getAllBusinessUnitApi,
	getDetailBusinessUnitApi,
} from "api/businessUnit";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { getAllColorApi, getDetailColorApi } from "api/color";
import { getAllLocationApi, getDetailLocationApi } from "api/location";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllAreaApi, getDetailAreaApi } from "api/area";
import { getAllWorkUnitApi, getDetailWorkUnitApi } from "api/workUnit";
import { getAllItemApi, getDetailItemApi } from "api/item";
import { IConditionGetAllParams } from "store/types/conditionTypes";
import { getAllConditionApi, getDetailConditionApi } from "api/condition";
import { getAllCountryApi, getDetailCountryApi } from "api/country";
import { ICountryGetAllParams } from "store/types/countryTypes";
import { checkDefaultOption, removeNullFields } from "app/helper/common";
import { isUndefined } from "lodash";
import { getAllDivisionApi, getDetailDivisionApi } from "api/division";
import { IDivisionGetAllParams } from "store/types/divisionTypes";
import { isSuperadminGlobal, tokenDecode } from "app/helper/permission";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const HbbInventory = () => {
	dayjs.extend(customParseFormat);
	const { Title } = Typography;
	const { TextArea } = Input;
	const location = useLocation();
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<File[] | null>(null);
	const [files, setFiles] = useState<FileList | null>(null);
	const inputFile = useRef<HTMLInputElement | null>(null);
	const [linkFile, setLinkFile] = useState<string[]>();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IInventoryGetAllParams | undefined>({
		per_page: 10,
	});
	const [paramsFilter, setParamsFilter] = useState<
		IInventoryGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [checkSerialNumberParams, setCheckSerialNumberParams] = useState<
		ICheckSerialNumberParams | undefined
	>();
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
	const [divisionParams, setDivisionParams] = useState<
		IDivisionGetAllParams | undefined
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
	const [dataOptionDivision, setDataOptionDivision] = useState<
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

	const showFile = useMemo(() => {
		if (linkFile?.length) {
			return (
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
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [linkFile]);

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllInventoryApi({
					inventory_type: location.state?.inventory_type,
					...params,
				});
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataSerialNumber = async () => {
		try {
			if (
				checkSerialNumberParams?.id_main_group &&
				checkSerialNumberParams?.id_sub_group &&
				checkSerialNumberParams?.year
			) {
				const response = await getSerialNumberApi(checkSerialNumberParams);
				formik.setFieldValue("serial_no", response.data.data);
				formRef.current?.setFieldsValue({
					serial_no: response.data.data,
				});
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailInventoryApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDivision = async () => {
		try {
			const response = await getAllDivisionApi({
				...divisionParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
				id_area: formik.values.id_area,
				id_satker: formik.values.id_satker,
			});
			const divisionList = response.data.data;
			setDataOptionDivision(
				divisionList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDivisionDetail = async (id: number) => {
		try {
			if (id) {
				const response = await getDetailDivisionApi(id);
				const detail = response.data.data;
				setDataOptionDivision(
					dataOptionDivision?.concat({ label: detail.name, value: detail.id }),
				);
			}
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
			const areaList = response.data.data;
			setDataOptionSubCodeGroup(
				areaList.map(v => ({ label: v.value, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataSubCodeGroupDetail = async (id: number) => {
		try {
			const response = await getDetailSubCodeGroupApi(id);
			const detail = response.data.data;
			setDataOptionSubCodeGroup([{ label: detail.value, value: detail.id }]);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCountry = async () => {
		try {
			const response = await getAllCountryApi({
				...countryParams,
			});
			const countryList = response.data.data;
			setDataOptionCountry(
				countryList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCountryDetail = async (id: number) => {
		try {
			const response = await getDetailCountryApi(id);
			const detail = response.data.data;
			setDataOptionCountry(
				dataOptionCountry?.concat({ label: detail.name, value: detail.id }),
			);
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
				employeeList.map(v => ({ label: v.emp_name, value: v.nipg })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataEmployeeDetail = async (id: number) => {
		try {
			const response = await getDetailEmployeeApi(id);
			const detail = response.data.data;
			setDataOptionEmployee(
				dataOptionEmployee?.concat({
					label: detail.emp_name,
					value: detail.nipg,
				}),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataItem = async () => {
		try {
			const response = await getAllItemApi({
				...itemParams,
			});
			const itemList = response.data.data.data;
			setDataOptionItem(itemList.map(v => ({ label: v.name, value: v.id })));
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataItemDetail = async (id: number) => {
		try {
			const response = await getDetailItemApi(id);
			const detail = response.data.data;
			setDataOptionItem(
				dataOptionItem?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataItemDetailToField = async (id: number) => {
		try {
			const response = await getDetailItemApi(id);
			const detail = response.data.data;
			delete detail.id_company;
			delete detail.id_area;

			if (detail.warna) {
				fetchDataColorDetail(detail.warna);
			}

			let data = {
				...formik.values,
				...detail,
				type: detail.tipe,
				capacity: detail.kapasitas,
				size: detail.ukuran,
				id_color: detail.warna ? parseInt(detail.warna) : undefined,
			};

			if (initialValue) {
				data = {
					...data,
					...initialValue,
				};
			}

			setInitialValue(data);
			formRef.current?.setFieldsValue(data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCondition = async () => {
		try {
			const response = await getAllConditionApi({
				...conditionParams,
				id_company: formik.values.id_company,
			});
			const conditionList = response.data.data;
			setDataOptionCondition(
				conditionList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataConditionDetail = async (id: number) => {
		try {
			const response = await getDetailConditionApi(id);
			const detail = response.data.data;
			setDataOptionCondition(
				dataOptionCondition?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi({
				...locationParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
				id_area: formik.values.id_area,
				id_division: formik.values.id_division,
			});
			const locationList = response.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataLocationDetail = async (id: number) => {
		try {
			const response = await getDetailLocationApi(id);
			const detail = response.data.data;
			setDataOptionLocation(
				dataOptionLocation?.concat({ label: detail.name, value: detail.id }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataColor = async () => {
		try {
			const response = await getAllColorApi(colorParams);
			const colorList = response.data.data;
			setDataOptionColor(colorList.map(v => ({ label: v.name, value: v.id })));
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataColorDetail = async (id: number) => {
		try {
			const response = await getDetailColorApi(id);
			const detail = response.data.data;
			setDataOptionColor(
				dataOptionColor?.concat({ label: detail.name, value: detail.id }),
			);
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
			const response = await getDetailBusinessUnitApi(id);
			const detail = response.data.data;
			setDataOptionBusinessUnit(
				dataOptionBusinessUnit?.concat({
					label: detail.name,
					value: detail.id,
				}),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataArea = async () => {
		try {
			const response = await getAllAreaApi({
				...areaParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
			});
			const areaList = response.data.data;
			setDataOptionArea(
				areaList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataAreaDetail = async (id: number) => {
		try {
			const response = await getDetailAreaApi(id);
			const detail = response.data.data;
			setDataOptionArea(
				dataOptionArea?.concat({ label: detail.name, value: `${detail.id}` }),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkUnit = async () => {
		try {
			const response = await getAllWorkUnitApi({
				...workUnitParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
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
			const response = await getDetailWorkUnitApi(id);
			const detail = response.data.data;
			setDataOptionWorkUnit(
				dataOptionWorkUnit?.concat({ label: detail.name, value: detail.id }),
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

	const handleInitialValue = (values: IInventoryDetail) => {
		const setData = removeNullFields(values);
		if (!checkDefaultOption(dataOptionDivision!, setData.id_division)) {
			fetchDataDivisionDetail(setData.id_division);
		}
		if (!checkDefaultOption(dataOptionCodeGroup!, setData.id_main_group)) {
			fetchDataCodeGroupDetail(setData.id_main_group);
		}
		if (!checkDefaultOption(dataOptionSubCodeGroup!, setData.id_sub_group)) {
			fetchDataSubCodeGroupDetail(setData.id_sub_group);
		}
		if (!checkDefaultOption(dataOptionCountry!, setData.id_country)) {
			fetchDataCountryDetail(setData.id_country);
		}
		if (!checkDefaultOption(dataOptionEmployee!, setData.id_penanggung_jawab)) {
			fetchDataEmployeeDetail(setData.id_penanggung_jawab);
		}
		if (!checkDefaultOption(dataOptionItem!, setData.id_barang)) {
			fetchDataItemDetail(setData.id_barang);
		}
		if (!checkDefaultOption(dataOptionCondition!, setData.condition)) {
			fetchDataConditionDetail(setData.condition);
		}
		if (!checkDefaultOption(dataOptionLocation!, setData.id_location)) {
			fetchDataLocationDetail(setData.id_location);
		}
		if (!checkDefaultOption(dataOptionWorkUnit!, setData.id_satker)) {
			fetchDataWorkUnitDetail(setData.id_satker);
		}
		if (!checkDefaultOption(dataOptionArea!, setData.id_area)) {
			fetchDataAreaDetail(setData.id_area);
		}
		if (!checkDefaultOption(dataOptionBusinessUnit!, setData.id_bisnis_unit)) {
			fetchDataBusinessUnitDetail(setData.id_bisnis_unit);
		}
		if (!checkDefaultOption(dataOptionCompany!, setData.id_company)) {
			fetchDataCompanyDetail(setData.id_company);
		}
		if (!checkDefaultOption(dataOptionColor!, setData.id_color)) {
			fetchDataColorDetail(setData.id_color);
		}
		setLinkFile(setData.upload);
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
	};

	useEffect(() => {
		fetchDataSerialNumber();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkSerialNumberParams]);

	useEffect(() => {
		fetchDataDivision();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [divisionParams]);

	useEffect(() => {
		fetchDataCountry();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryParams]);

	useEffect(() => {
		fetchDataWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

	useEffect(() => {
		fetchDataItem();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemParams]);

	useEffect(() => {
		fetchDataCondition();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [conditionParams]);

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
		const itemId = formik.values.id_barang;
		if (itemId && initialValue?.id_barang) {
			if (itemId !== initialValue.id_barang) {
				fetchDataItemDetailToField(itemId);
			}
		}

		if (itemId && !initialValue) {
			fetchDataItemDetailToField(itemId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_barang]);

	useEffect(() => {
		const companyId = formik.values.id_company;
		if (companyId) {
			const isUndefinedCompanyId = initialValue?.id_company === undefined;
			if (isUndefinedCompanyId || companyId !== initialValue.id_company) {
				formik.setFieldValue("id_main_group", undefined);
				formRef.current?.setFieldsValue({ id_main_group: undefined });
				formik.setFieldValue("id_bisnis_unit", undefined);
				formRef.current?.setFieldsValue({ id_bisnis_unit: undefined });
				formik.setFieldValue("condition", undefined);
				formRef.current?.setFieldsValue({ condition: undefined });
				formik.setFieldValue("id_color", undefined);
				formRef.current?.setFieldsValue({ id_color: undefined });
				formik.setFieldValue("id_penanggung_jawab", undefined);
				formRef.current?.setFieldsValue({
					id_penanggung_jawab: undefined,
				});
			}
			fetchDataCodeGroup();
			fetchDataBusinessUnit();
			fetchDataCondition();
			fetchDataColor();
			fetchDataEmployee();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_company]);

	useEffect(() => {
		const businessUnitId = formik.values.id_bisnis_unit;
		if (businessUnitId) {
			const isInitialValueUndefined =
				initialValue?.id_bisnis_unit === undefined;
			if (
				isInitialValueUndefined ||
				businessUnitId !== initialValue.id_bisnis_unit
			) {
				formik.setFieldValue("id_area", undefined);
				formRef.current?.setFieldsValue({ id_area: undefined });
			}
			fetchDataArea();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_bisnis_unit]);

	useEffect(() => {
		const workUnitId = formik.values.id_satker;
		if (workUnitId) {
			const isInitialValueUndefined = initialValue?.id_satker === undefined;
			if (isInitialValueUndefined || workUnitId !== initialValue.id_satker) {
				formik.setFieldValue("id_division", undefined);
				formRef.current?.setFieldsValue({ id_division: undefined });
			}
			fetchDataDivision();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_satker]);

	useEffect(() => {
		const areaId = formik.values.id_area;
		const divisionId = formik.values.id_division;

		const resetLocation = () => {
			formik.setFieldValue("id_location", undefined);
			formRef.current?.setFieldsValue({ id_location: undefined });
		};

		if (areaId) {
			const isInitialValueUndefined = initialValue?.id_area === undefined;
			if (isInitialValueUndefined || areaId !== initialValue.id_area) {
				resetLocation();
			}
			fetchDataLocation();
		}

		if (divisionId) {
			const isInitialValueUndefined = initialValue?.id_satker === undefined;
			if (isInitialValueUndefined || divisionId !== initialValue.id_satker) {
				resetLocation();
			}
			fetchDataLocation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_area, formik.values.id_division]);

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
		setFiles(null);
		setFileList(null);
		setLinkFile(undefined);
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
		if (!isSuperadminGlobal) {
			values = { ...values, id_company: tokenDecode?.user?.id_company };
		}
		values = { ...values, files: files };
		if (showModal.id) {
			updateInventoryApi(showModal.id, values)
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
			createNewInventoryApi(values)
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

	const itemTab: TabsProps["items"] = [
		{
			key: "1",
			label: `Informasi Umum`,
			children: (
				<>
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
									onSearch={v => setCodeGroupParams({ group: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionCodeGroup}
									onChange={(v, opt) => {
										setCheckSerialNumberParams({
											...checkSerialNumberParams,
											id_main_group: v,
										});
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
										setCheckSerialNumberParams({
											...checkSerialNumberParams,
											id_sub_group: v,
										});
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
					<Form.Item name="id_division">
						<div className="form-group">
							<Title level={5}>Divisi</Title>
							<div className="controls">
								<Select
									showSearch
									onSearch={v => setDivisionParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionDivision}
									onChange={(v, opt) => {
										formik.setFieldValue("id_division", v);
										formRef.current?.setFieldsValue({
											id_division: v,
										});
									}}
									value={formik.values.id_division}
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
									onSearch={v => setLocationParams({ lokasi: v })}
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
										setCheckSerialNumberParams({
											...checkSerialNumberParams,
											year: dateString,
										});
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
									readOnly
									type="text"
									name="serial_no"
									className="form-control"
									placeholder="Otomatis terisi ketika sudah pilih main-group, sub-group & tahun perolehan"
									value={formik.values.serial_no}
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
									value={formik.values.price}
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
									value={formik.values.jumlah}
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
									onSearch={v => setColorParams({ color: v })}
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
					<Form.Item name="capacity">
						<div className="form-group">
							<Title level={5}>Kapasitas</Title>
							<div className="controls">
								<Input
									type="text"
									name="capacity"
									className="form-control"
									placeholder="Kapasitas"
									onChange={formik.handleChange}
									value={formik.values.capacity}
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
					<Form.Item name="date_bast">
						<div className="form-group">
							<Title level={5}>Tanggal BAST</Title>
							<div className="controls">
								<DatePicker
									className="form-control"
									onChange={(value, dateString) => {
										formik.setFieldValue("date_bast", dateString);
										formRef.current?.setFieldsValue({
											date_bast: dateString,
										});
									}}
									format={"YYYY-MM-DD"}
									value={
										formik.values.date_bast
											? dayjs(formik.values.date_bast, "YYYY-MM-DD")
											: undefined
									}
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
		{
			key: "4",
			label: `File`,
			children: <>{showFile}</>,
		},
	];

	const handleCancel = () => {
		setShowModal({ show: false });
	};

	return (
		<>
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
					<Tabs
						defaultActiveKey="1"
						items={
							showModal.show && showModal.id
								? itemTab
								: itemTab.filter(v => v.key !== "4")
						}
					/>
				</Form>
			</AntdModal>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParamsFilter}
				setParamsOption={{
					setCodeGroupParams,
					setSubCodeGroupParams,
					setBusinessUnitParams,
					setAreaParams,
					setWorkUnitParams,
					setLocationParams,
					setConditionParams,
					setCompanyParams,
				}}
				options={{
					dataOptionCodeGroup,
					dataOptionSubCodeGroup,
					dataOptionBusinessUnit,
					dataOptionArea,
					dataOptionWorkUnit,
					dataOptionLocation,
					dataOptionCondition,
					dataOptionCompany,
				}}
			/>
		</>
	);
};

export default HbbInventory;
