import { DefaultOptionType } from "antd/es/select";
import {
	getAllItemApi,
	getConditionItemApi,
	getStatusAvailableItemApi,
	getTotalHbbApi,
	getTotalHbbValueApi,
	getTotalInventoryApi,
	getTotalInventoryValueApi,
	getTotalItemPerMonthApi,
	getTotalTaskApi,
	getTotalValuePerMonthApi,
} from "api/dashboard";
import { getAllLocationApi } from "api/location";
import { ColumnChart } from "app/components/chart/column";
import { LineChart } from "app/components/chart/line";
import { PieChart } from "app/components/chart/pie";
import { CheckResponse } from "app/helper/authentication";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ILocationGetAllParams } from "store/types/locationTypes";
import ModalTask from "./components/modalTask";
import { convertToMonthNames } from "app/helper/common";

const Dashboard = () => {
	const [allItem, setAllItem] = useState(0);
	const [totalInventory, setTotalInventory] = useState(0);
	const [totalHbb, setTotalHbb] = useState(0);
	const [totalInventoryValue, setTotalInventoryValue] = useState(0);
	const [totalHbbValue, setTotalHbbValue] = useState(0);
	const [dataTask, setDataTask] = useState<{
		total_task: number;
		list_task: any[];
	}>({ total_task: 0, list_task: [] });
	const [dataChartItem, setDataChartItem] = useState([]);
	const [dataChartValue, setDataChartValue] = useState([]);
	const [dataConditionItem, setDataConditionItem] = useState<{
		label?: string[];
		data?: number[];
	}>({
		label: [],
		data: [],
	});
	const [isShowModalTask, setIsShowModalTask] = useState<boolean>(false);
	const [dataStatusAvailableItem, setDataStatusAvailableItem] = useState<{
		label?: string[];
		data?: number[];
	}>({
		label: [],
		data: [],
	});
	const [locationParams] = useState<ILocationGetAllParams | undefined>();
	const [_, setDataOptionLocation] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataAllItem = async () => {
		try {
			const response = await getAllItemApi();
			setAllItem(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalInventory = async () => {
		try {
			const response = await getTotalInventoryApi();
			setTotalInventory(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalHbb = async () => {
		try {
			const response = await getTotalHbbApi();
			setTotalHbb(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalHbbValue = async () => {
		try {
			const response = await getTotalHbbValueApi();
			setTotalHbbValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalInventoryValue = async () => {
		try {
			const response = await getTotalInventoryValueApi();
			setTotalInventoryValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalTask = async () => {
		try {
			const response = await getTotalTaskApi();
			setDataTask(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalItemPerMonth = async () => {
		try {
			const response = await getTotalItemPerMonthApi();
			setDataChartItem(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataConditionItem = async () => {
		try {
			const response = await getConditionItemApi();
			setDataConditionItem(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataTotalValuePerMonth = async () => {
		try {
			const response = await getTotalValuePerMonthApi();
			setDataChartValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi({
				...locationParams,
			});
			const locationList = response.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchStatusAvailableItem = async () => {
		try {
			const response = await getStatusAvailableItemApi();
			setDataStatusAvailableItem(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	useEffect(() => {
		fetchDataAllItem();
		fetchDataTotalInventory();
		fetchDataTotalHbb();
		fetchDataTotalInventoryValue();
		fetchDataTotalHbbValue();
		fetchDataTotalTask();
		fetchDataTotalItemPerMonth();
		fetchDataTotalValuePerMonth();
		fetchDataConditionItem();
		fetchStatusAvailableItem();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

	useEffect(() => {
		if (dataTask.list_task.length) {
			setIsShowModalTask(true);
		}
	}, [dataTask]);

	const fetchDataLine = {
		months: convertToMonthNames([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		data: dataChartValue,
	};

	const fetchDataColumn = {
		months: convertToMonthNames([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		data: dataChartItem,
	};

	const fetchDataPieCondition = dataConditionItem;

	const fetchDataPieAvailable = dataStatusAvailableItem;

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-xl-3 col-lg-6 col-12">
						<Link to={""} onClick={() => setIsShowModalTask(true)}>
							<div className="box">
								<div className="box-body">
									<div className="d-flex justify-content-between">
										<h5 className="fw-600 text-primary my-0">
											{dataTask?.total_task}
										</h5>
										{/* <div className="bg-primary rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-tasks"></i>
									</div> */}
									</div>
									<p className="fs-9 mt-10">Task</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<Link to={"/inventaris"}>
							<div className="box">
								<div className="box-body">
									<div className="d-flex justify-content-between">
										<h5 className="fw-600 text-danger my-0">{allItem}</h5>
										{/* <div className="bg-danger rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div> */}
									</div>
									<p className="fs-9 mt-10">Jumlah Barang</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<Link to={"/inventaris"} state={{ inventory_type: 2 }}>
							<div className="box">
								<div className="box-body">
									<div className="d-flex justify-content-between">
										<div>
											<h5 className="fw-600 text-info my-0">{totalHbb}</h5>
										</div>
										{/* <div className="bg-info rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div> */}
									</div>
									<p className="fs-9 mt-10">Total HBB</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-xl-3 col-lg-6 col-12">
						<Link to={"/inventaris"} state={{ inventory_type: 1 }}>
							<div className="box">
								<div className="box-body">
									<div className="d-flex justify-content-between">
										<div>
											<h5 className="fw-600 text-warning my-0">
												{totalInventory}
											</h5>
										</div>
										{/* <div className="bg-warning rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dropbox"></i>
									</div> */}
									</div>
									<p className="fs-9 mt-10">Total Inventaris</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-success my-0">
											Rp. {totalHbbValue}
										</h5>
									</div>
									{/* <div className="bg-success rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dollar"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Nilai Total HBB</p>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<div>
										<h5 className="fw-600 text-mute my-0">
											Rp. {totalInventoryValue}
										</h5>
									</div>
									{/* <div className="bg-mute rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-dollar"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Nilai Total Inventaris</p>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">Jumlah Barang</h4>
							</div>
							<div className="box-body">
								<ColumnChart
									series={fetchDataColumn.data}
									categories={fetchDataColumn.months}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<h4 className="box-title">Nilai Total</h4>
							</div>
							<div className="box-body">
								<LineChart
									series={fetchDataLine.data}
									categories={fetchDataLine.months}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<h4 className="box-title">Kondisi Barang</h4>
									{/* <Select
										showSearch
										onSearch={v => setLocationParams({ lokasi: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionLocation}
										onChange={(v, opt) => {}}
										style={{ width: "25%" }}
										placeholder={"Pilih lokasi"}
									/> */}
								</div>
							</div>
							<div className="box-body">
								<PieChart
									series={fetchDataPieCondition.data}
									labels={fetchDataPieCondition?.label?.map(text =>
										text.replace(/^\w/, c => c.toUpperCase()),
									)}
									height={250}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-12">
						<div className="box">
							<div className="box-header with-border">
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<h4 className="box-title">Kesediaan Barang</h4>
									{/* <Select
										showSearch
										onSearch={v => setLocationParams({ lokasi: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionLocation}
										onChange={(v, opt) => {}}
										style={{ width: "25%" }}
										placeholder={"Pilih lokasi"}
									/> */}
								</div>
							</div>
							<div className="box-body">
								<PieChart
									series={fetchDataPieAvailable.data}
									labels={fetchDataPieAvailable.label}
									height={250}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ModalTask
				dataTable={dataTask.list_task}
				isShowModal={isShowModalTask}
				setIsShowModal={setIsShowModalTask}
			/>
		</>
	);
};

export default Dashboard;
