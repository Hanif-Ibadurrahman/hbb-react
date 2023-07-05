import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { ModalFilter } from "./components/modalFilter";
import { IRoomInventoryGetAllParams } from "store/types/roomInventoryTypes";
import {
	exportRoomInventoryApi,
	getAllRoomInventoryApi,
} from "api/roomInventory";
import { CheckResponse } from "app/helper/authentication";
import { Space } from "antd";
import { ICodeGroupGetAllParams } from "store/types/codeGroupTypes";
import { ISubCodeGroupGetAllParams } from "store/types/subCodeGroupTypes";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { DefaultOptionType } from "antd/es/select";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllCodeGroupApi } from "api/codeGroup";
import { getAllCompanyApi } from "api/company";
import { getAllSubCodeGroupApi } from "api/subCodeGroup";
import { getAllLocationApi } from "api/location";
import { getAllBusinessUnitApi } from "api/businessUnit";
import { getAllAreaApi } from "api/area";
import { getAllWorkUnitApi } from "api/workUnit";
import { useFormik } from "formik";
import { omit } from "lodash";

const RoomInventory = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IRoomInventoryGetAllParams | undefined>({
		per_page: 10,
	});
	const [initialValue, _] = useState<Partial<IRoomInventoryGetAllParams>>();
	const [paramsFilter, setParamsFilter] = useState<
		IRoomInventoryGetAllParams | undefined
	>();
	const [paramsForExport, setParamsForExport] = useState<
		IRoomInventoryGetAllParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
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
	const [workUnitParams, setWorkUnitParams] = useState<
		IWorkUnitGetAllParams | undefined
	>();
	const [locationParams, setLocationParams] = useState<
		ILocationGetAllParams | undefined
	>();
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
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
	const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionLocation, setDataOptionLocation] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionArea, setDataOptionArea] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkUnit, setDataOptionWorkUnit] = useState<
		DefaultOptionType[] | undefined
	>();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataList = async () => {
		try {
			if (params) {
				const filter = omit(params, [
					"page",
					"per_page",
					"type_export",
					"order_by",
					"sort",
				]);
				setParamsForExport(filter);

				const new_params = omit(params, ["type_export"]);
				const response = await getAllRoomInventoryApi(new_params);
				setDataTable(response.data.data);
			}
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

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi({
				...locationParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
				id_area: formik.values.id_area,
				id_satker: formik.values.id_satker,
			});
			const locationList = response.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

	useEffect(() => {
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessUnitParams]);

	useEffect(() => {
		fetchDataWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

	useEffect(() => {
		fetchDataCodeGroup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codeGroupParams]);

	useEffect(() => {
		const companyId = formik.values.id_company;
		if (companyId) {
			const isUndefinedCompanyId = initialValue?.id_company === undefined;
			if (isUndefinedCompanyId || companyId !== initialValue.id_company) {
				formik.setFieldValue("id_main_group", undefined);
				formik.setFieldValue("id_bisnis_unit", undefined);
			}
			fetchDataCodeGroup();
			fetchDataBusinessUnit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_company]);

	useEffect(() => {
		const mainGroupId = formik.values.id_main_group;
		if (mainGroupId) {
			fetchDataSubCodeGroup(mainGroupId);
			formik.setFieldValue("id_sub_group", undefined);
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
		const businessUnitId = formik.values.id_bisnis_unit;
		if (businessUnitId) {
			const isInitialValueUndefined =
				initialValue?.id_bisnis_unit === undefined;
			if (
				isInitialValueUndefined ||
				businessUnitId !== initialValue.id_bisnis_unit
			) {
				formik.setFieldValue("id_area", undefined);
			}
			fetchDataArea();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_bisnis_unit]);

	useEffect(() => {
		const areaId = formik.values.id_area;

		if (areaId) {
			const isInitialValueUndefined = initialValue?.id_area === undefined;
			if (isInitialValueUndefined || areaId !== initialValue.id_area) {
				formik.setFieldValue("id_location", undefined);
				formik.setFieldValue("id_satker", undefined);
			}
			fetchDataWorkUnit();
			fetchDataLocation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_area]);

	useEffect(() => {
		const workUnitId = formik.values.id_satker;
		if (workUnitId) {
			const isInitialValueUndefined = initialValue?.id_satker === undefined;
			if (isInitialValueUndefined || workUnitId !== initialValue.id_satker) {
				formik.setFieldValue("id_location", undefined);
			}
			fetchDataLocation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_satker]);

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

	const handleExport = async (type: string) => {
		if (type === "excel") {
			const response = await exportRoomInventoryApi(paramsForExport);
			const url = response.data.data.replace(/\\/g, "");
			window.location.href = url;
		} else {
		}
	};

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Laporan Inventaris Ruangan"
							dataSource={dataTable}
							columns={columns()}
							contentHeader={
								<Space
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "1em",
									}}
								>
									<Space>
										<button
											className="btn btn-secondary"
											onClick={() => handleExport("excel")}
										>
											Excel
										</button>
										<button
											className="btn btn-secondary"
											onClick={() => handleExport("pdf")}
										>
											Pdf
										</button>
									</Space>
									<button
										className="btn btn-secondary"
										onClick={() => setShowFilter(true)}
									>
										<i className="fa fa-filter" />
									</button>
								</Space>
							}
							setSelectedPageAndSort={setSelectedPageAndSort}
							scroll={{ x: 1800 }}
						/>
					</div>
				</div>
			</section>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParamsFilter}
				formik={formik}
				setParamsOption={{
					setBusinessUnitParams,
					setAreaParams,
					setLocationParams,
					setWorkUnitParams,
					setCodeGroupParams,
					setSubCodeGroupParams,
					setCompanyParams,
				}}
				options={{
					dataOptionBusinessUnit,
					dataOptionArea,
					dataOptionLocation,
					dataOptionWorkUnit,
					dataOptionCodeGroup,
					dataOptionSubCodeGroup,
					dataOptionCompany,
				}}
			/>
		</>
	);
};

export default RoomInventory;
