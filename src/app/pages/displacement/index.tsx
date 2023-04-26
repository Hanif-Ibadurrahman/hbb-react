import { TableSelectionPaginateAndSort } from "app/components/table/antd/tableSelectionPaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useState } from "react";
import { PaginationState } from "store/types/paginationTypes";
import { columns } from "./components/table/columnAndDataType";
import { CenterModal } from "app/components/modal/centerModal";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";

const Displacement = () => {
	const [selectedRow, setSelectedRow] = useState<any[]>([]);
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [fetchData, setFetchData] = useState<PaginationState>();

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TableSelectionPaginateAndSort
							title={"Pemindahan"}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									data-bs-toggle="modal"
									data-bs-target="#modal_pindah"
								>
									Pindah Barang
								</button>
							}
							columns={columns}
							rowKey={"name_barang"}
							dataSource={fetchData}
							setSelectedRow={setSelectedRow}
							setSelectedPageAndSort={setSelectedPageAndSort}
							scroll={{ x: 2500, y: 600 }}
						/>
					</div>
				</div>
			</section>

			<CenterModal
				modalName="modal_pindah"
				title="Pemindahan Barang"
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
						<h6>Jenis Barang</h6>
						<select className="form-select" name="jenis_barang">
							<option value="inventaris">Inventaris</option>
						</select>
					</div>
					<div className="form-group">
						<h6>Main Group</h6>
						<select className="form-select" name="main_group">
							<option value="kendaraan_bermotor">
								05 - Kendaraan Bermotor
							</option>
						</select>
					</div>
					<div className="form-group">
						<h6>Sub Group</h6>
						<select className="form-select" name="main_group">
							<option value="kendaraan_bermotor">03 - Kendaraan Lainnya</option>
						</select>
					</div>
					<div className="form-group">
						<h6>Tahun Perolehan</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Urut</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
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
						<h6>Distributor</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Jumlah Barang</h6>
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
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Jenis Barang</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Main Group</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Sub Group</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Tahun Perolehan</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Nama Barang</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Distributor</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No Akuntansi</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No BAST/DO</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Negara Pembuat</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Tahun Pembuatan</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Merk</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Jenis</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Model</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Warna</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Kapasitas</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default Displacement;
