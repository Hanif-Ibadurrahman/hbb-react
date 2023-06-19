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
import { omit } from "lodash";

const CorporateInventoryReport = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<
		ICorporateInventoryReportGetAllParams | undefined
	>({
		per_page: 10,
	});
	// const [initialValue, setInitialValue] =
	// 	useState<Partial<ICorporateInventoryReportGetAllParams>>();
	const [paramsFilter, setParamsFilter] = useState<
		ICorporateInventoryReportGetAllParams | undefined
	>();
	const [paramsForExport, setParamsForExport] = useState<
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

	// const formik = useFormik({
	// 	initialValues: { ...initialValue },
	// 	enableReinitialize: true,
	// 	onSubmit: values => {},
	// });

	const fetchDataList = async () => {
		try {
			if (params) {
				// if (params.type_export === "excel") {
				// 	const filter = omit(params, ["page", "per_page", "type_export"]);
				// 	const response = await exportCorporateInventoryReportApi(filter);
				// 	const url = response.data.data.replace(/\\/g, "");
				// 	window.location.href = url;

				/////////////////////////////
				// const anchor = document.createElement("a");
				// anchor.href = url;
				// anchor.click();

				////////////////////////////
				// const newTab = window.open(url, "_blank");
				// newTab?.focus();
				// }

				const filter = omit(params, [
					"page",
					"per_page",
					"type_export",
					"order_by",
					"sort",
				]);
				setParamsForExport(filter);

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

	const handleExport = async (type: string) => {
		if (type === "excel") {
			const response = await exportCorporateInventoryReportApi(paramsForExport);
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
							title="Laporan Inventaris Koorporat"
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
