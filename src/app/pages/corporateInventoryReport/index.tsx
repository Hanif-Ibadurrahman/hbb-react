import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { ModalFilter } from "./components/modalFilter";
import { ICorporateInventoryReportGetAllParams } from "store/types/corporateInventoryReportTypes";
import {
	exportCorporateInventoryReportApi,
	getAllCorporateInventoryReportApi,
} from "api/corporateInventoryReport";
import { CheckResponse } from "app/helper/authentication";
import { Space } from "antd";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { DefaultOptionType } from "antd/es/select";
import { getAllCompanyApi } from "api/company";
import { useFormik } from "formik";
import { omit } from "lodash";

const CorporateInventoryReport = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<
		ICorporateInventoryReportGetAllParams | undefined
	>({
		per_page: 10,
	});
	const [initialValue, setInitialValue] =
		useState<Partial<ICorporateInventoryReportGetAllParams>>();
	const [paramsFilter, setParamsFilter] = useState<
		ICorporateInventoryReportGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionCompany, setDataOptionCompany] = useState<
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
					const response = await exportCorporateInventoryReportApi(filter);
					const url = response.data.data;
					const newTab = window.open(url, "_blank");
					newTab?.focus();
				}

				const new_params = omit(params, ["type_export"]);
				const response = await getAllCorporateInventoryReportApi(new_params);
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

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

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

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Laporan Inventaris Koorporat"
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

export default CorporateInventoryReport;
