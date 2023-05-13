import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { ModalFilter } from "./components/modalFilter";
import { IInventoryReportGetAllParams } from "store/types/inventoryReportTypes";
import {
	exportInventoryReportApi,
	getAllInventoryReportApi,
} from "api/inventoryReport";
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

const HbbInventoryReport = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<
		IInventoryReportGetAllParams | undefined
	>({
		per_page: 10,
	});
	const [initialValue, setInitialValue] =
		useState<Partial<IInventoryReportGetAllParams>>();
	const [paramsFilter, setParamsFilter] = useState<
		IInventoryReportGetAllParams | undefined
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
				if (params.type_export === "excel") {
					const filter = omit(params, ["page", "per_page", "type_export"]);
					await exportInventoryReportApi(filter);
				}

				const new_params = omit(params, ["type_export"]);
				const response = await getAllInventoryReportApi(new_params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataCodeGroup = async () => {
		try {
			const response = await getAllCodeGroupApi(codeGroupParams);
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
			const response = await getAllSubCodeGroupApi(id, subCodeGroupParams);
			const areaList = response.data.data;
			setDataOptionSubCodeGroup(
				areaList.map(v => ({ label: v.value, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi(locationParams);
			const locationList = response.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataBusinessUnit = async () => {
		try {
			const response = await getAllBusinessUnitApi(businessUnitParams);
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
			const response = await getAllAreaApi(areaParams);
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
			const response = await getAllWorkUnitApi(workUnitParams);
			const workUnitList = response.data.data;
			setDataOptionWorkUnit(
				workUnitList.map(v => ({ label: v.name, value: `${v.id}` })),
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

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

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
		fetchDataCompany();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyParams]);

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
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessUnitParams]);

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Laporan HBB dan Inventaris"
							dataSource={dataTable}
							columns={columns()}
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
								</Space>
							}
							setSelectedPageAndSort={setSelectedPageAndSort}
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

export default HbbInventoryReport;
