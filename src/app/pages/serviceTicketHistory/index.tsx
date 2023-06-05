import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	getAllServiceTicketHistoryApi,
	getDetailServiceTicketHistoryApi,
} from "api/serviceTicketHistory";
import {
	IServiceTicketHistoryGetAllParams,
	IServiceTicketHistoryPaginateResponse,
} from "store/types/serviceTicketHistoryTypes";
import { DefaultOptionType } from "antd/es/select";
import { Space } from "antd";
import { CheckResponse } from "app/helper/authentication";
import { ModalFilter } from "./components/modalFilter";
import { ICompanyGetAllParams } from "store/types/companyTypes";
import { getAllCompanyApi } from "api/company";
import ModalDetail from "./components/modalDetail";

const ServiceTicketHistory = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<
		IServiceTicketHistoryGetAllParams | undefined
	>({
		per_page: 10,
	});
	const [dataDetail, setDataDetail] = useState();
	const [paramsFilter, setParamsFilter] = useState<
		IServiceTicketHistoryGetAllParams | undefined
	>();
	const [companyParams, setCompanyParams] = useState<
		ICompanyGetAllParams | undefined
	>();
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
	const [dataTable, setDataTable] =
		useState<IServiceTicketHistoryPaginateResponse>();
	const [dataOptionCompany, setDataOptionCompany] = useState<
		DefaultOptionType[] | undefined
	>();

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

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllServiceTicketHistoryApi(params);
				setDataTable(response.data);
			}
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailServiceTicketHistoryApi(id);
			setDataDetail(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
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
		if (showModalDetail.show && showModalDetail.id) {
			fetchDataDetail(showModalDetail.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModalDetail]);

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Riwayat"
							dataSource={dataTable}
							columns={columns({
								setShowModalDetail,
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
								</Space>
							}
							scroll={{ x: 1800 }}
						/>
					</div>
				</div>
			</section>

			<ModalDetail
				dataDetail={dataDetail}
				showModal={showModalDetail.show}
				setShowModal={setShowModalDetail}
			/>

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

export default ServiceTicketHistory;
