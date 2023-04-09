import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { CenterModal } from "app/components/modal/centerModal";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { useDispatch } from "react-redux";
import { getAllAreaApi } from "api/area";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { getAllBusinessUnitApi } from "api/businessUnit";
import { DefaultOptionType } from "antd/es/select";

const MasterArea = () => {
	const dispatch = useDispatch();
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [params, setParams] = useState<IAreaGetAllParams | undefined>();
	const [tempFilter, setTempFilter] = useState<IAreaGetAllParams | undefined>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [initialValue, setInitialValue] = useState<string | null>();
	const [dataTable, setDataTable] = useState();
	const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
		DefaultOptionType[] | undefined
	>();

	const fetchDataList = async () => {
		try {
			const response = await getAllAreaApi(params);
			setDataTable(response.data.data);
			// await dispatch(getAreaListAction(params));
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const fetchDataBusinessUnit = async () => {
		try {
			const response = await getAllBusinessUnitApi();
			const businessUnitList = response.data.data.data;
			setDataOptionBusinessUnit(
				businessUnitList.map(v => ({ label: v.name, value: v.name })),
			);
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		setParams({
			...params,
			page: selectedPage.page,
			page_size: selectedPage.pageSize,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPage]);

	const setValueFilter = () => {
		setParams({ ...params, ...tempFilter });
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Area / Direktorat"
							dataSource={dataTable}
							columns={columns({ setShowModal })}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									data-bs-toggle="modal"
									data-bs-target="#modal_add"
								>
									Tambah
								</button>
							}
						/>
					</div>
				</div>
			</section>

			<CenterModal
				modalName="modal"
				title="Tambah Data"
				contentFooter={
					<button
						type="button"
						className="btn btn-primary"
						data-bs-dismiss="modal"
					>
						Simpan
					</button>
				}
			>
				<div className="col-12">
					<div className="form-group">
						<h6>
							Nama Area <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<input
								type="text"
								name="text"
								className="form-control"
								required
								data-validation-required-message="This field is required"
							/>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Daerah <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<input
								type="text"
								name="text"
								className="form-control"
								required
								data-validation-required-message="This field is required"
							/>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Pengelola <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<input
								type="text"
								name="text"
								className="form-control"
								required
								data-validation-required-message="This field is required"
							/>
						</div>
					</div>
					<div className="form-group">
						<h6>NIPG</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Pemegang</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Bisnis Unit</h6>
						<select className="form-select" name="bisnis_unit">
							<option value="kantor_pusat">Kantor Pusat</option>
						</select>
					</div>
				</div>
			</CenterModal>

			<SideModal
				title="Filter"
				contentFooter={
					<button
						type="button"
						className="btn btn-primary"
						data-bs-dismiss="modal"
						onClick={setValueFilter}
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Nama Area</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ name: v.toString() })}
				/>
				<h6 className="box-title mt-10 d-block mb-10">Daerah</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ daerah: v.toString() })}
				/>
				<h6 className="box-title mt-10 d-block mb-10">Pengelola</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">NIPG</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Pemegang</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ pemegang: v.toString() })}
				/>
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag colorTag="cyan" dataOption={dataOptionBusinessUnit} />
			</SideModal>
		</MainLayout>
	);
};

export default MasterArea;
