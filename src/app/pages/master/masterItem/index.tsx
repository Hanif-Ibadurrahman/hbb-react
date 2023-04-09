import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { CenterModal } from "app/components/modal/centerModal";
import { IItemGetAllParams } from "store/types/itemTypes";
import { getAllItemApi } from "api/item";

const MasterItem = () => {
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });

	const [params, setParams] = useState<IItemGetAllParams | undefined>();
	const [tempFilter, setTempFilter] = useState<IItemGetAllParams | undefined>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [initialValue, setInitialValue] = useState<string | null>();
	const [dataTable, setDataTable] = useState();

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const fetchDataList = async () => {
		try {
			const response = await getAllItemApi(params);
			setDataTable(response.data.data);
			// await dispatch(getCountryListAction(params));
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

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
							title="Barang"
							dataSource={dataTable}
							columns={columns({ setShowModal })}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									data-bs-toggle="modal"
									data-bs-target="#modal"
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
							Main Group <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select
								className="form-select"
								name="main_group"
								required
								data-validation-required-message="This field is required"
							>
								<option value="kendaraan_bermotor">
									05 - Kendaraan Bermotor
								</option>
								<option value="peralatan_kantor">06 - Peralatan Kantor</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Sub Group <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select
								className="form-select"
								name="main_group"
								required
								data-validation-required-message="This field is required"
							>
								<option value="kendataan_roda_empat">
									01 - Kendaraan Roda Empat
								</option>
								<option value="kendataan_roda_dua">
									02 - Kendaraan Roda Dua
								</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Nama Barang <span className="text-danger">*</span>
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
						<h6>Merk</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Tipe</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Jenis</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Model</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Warna</h6>
						<select className="form-select" name="warna">
							<option value="kuning">Kuning</option>
							<option value="biru">Biru</option>
						</select>
					</div>
					<div className="form-group">
						<h6>Kapasitas</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Ukuran</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
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
				<h6 className="box-title mt-10 d-block mb-10">Main Group</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Sub Group</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Nama Barang</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Merk</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Tipe</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Jenis</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Model</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Warna</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Kapasitas</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Ukuran</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default MasterItem;
