import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import {
	getAllItemApi,
	getTotalHbbApi,
	getTotalHbbValueApi,
	getTotalInventoryApi,
	getTotalInventoryValueApi,
	getTotalTaskApi,
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

const Dashboard = () => {
	const [allItem, setAllItem] = useState(0);
	const [totalInventory, setTotalInventory] = useState(0);
	const [totalHbb, setTotalHbb] = useState(0);
	const [totalInventoryValue, setTotalInventoryValue] = useState(0);
	const [totalHbbValue, setTotalHbbValue] = useState(0);
	const [totalTask, setTotalTask] = useState(0);
	const [locationParams, setLocationParams] = useState<
		ILocationGetAllParams | undefined
	>();
	const [dataOptionLocation, setDataOptionLocation] = useState<
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
			setTotalTask(response.data.data);
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

	useEffect(() => {
		fetchDataAllItem();
		fetchDataTotalInventory();
		fetchDataTotalHbb();
		fetchDataTotalInventoryValue();
		fetchDataTotalHbbValue();
		fetchDataTotalTask();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

	const fetchDataLine = {
		months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
		data: [
			{ name: "HBB", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
			{ name: "Inventaris", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
		],
	};

	const fetchDataColumn = {
		months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
		data: [
			{ name: "HBB", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
			{ name: "Inventaris", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
		],
	};

	const fetchDataPieCondition = {
		label: ["Baik", "Rusak", "Hilang"],
		data: [2000, 400, 54],
	};

	const fetchDataPieAvailable = {
		label: ["Aktif", "Gudang"],
		data: [54, 2400],
	};

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-xl-3 col-lg-6 col-12">
						<div className="box">
							<div className="box-body">
								<div className="d-flex justify-content-between">
									<h5 className="fw-600 text-primary my-0">{totalTask}</h5>
									{/* <div className="bg-primary rounded-circle fs-24 l-h-40 h-40 w-40 text-center">
										<i className="fa fa-tasks"></i>
									</div> */}
								</div>
								<p className="fs-9 mt-10">Task</p>
							</div>
						</div>
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
					<div className="col-xl-12 col-12">
						<div className="box">
							<div className="box-header with-border">
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<h4 className="box-title">Kondisi & Kesediaan Barang</h4>
									<Select
										showSearch
										onSearch={v => setLocationParams({ lokasi: v })}
										filterOption={(input, option) =>
											(`${option?.label}` ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={dataOptionLocation}
										onChange={(v, opt) => {}}
										style={{ width: 200 }}
										placeholder={"Pilih lokasi"}
									/>
								</div>
							</div>
							<div className="box-body">
								<div
									style={{ display: "flex", justifyContent: "space-around" }}
								>
									<PieChart
										series={fetchDataPieCondition.data}
										labels={fetchDataPieCondition.label}
									/>
									<PieChart
										series={fetchDataPieAvailable.data}
										labels={fetchDataPieAvailable.label}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ModalTask />
		</>
	);
};

export default Dashboard;
