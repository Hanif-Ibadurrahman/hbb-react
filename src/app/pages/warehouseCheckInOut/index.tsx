import { MainLayout } from "app/layout/mainLayout";
import { TableSelectionPaginateAndSort } from "app/components/table/antd/tableSelectionPaginateAndSort";
import { useState } from "react";
import { PaginationState } from "store/types/paginationTypes";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { CenterModal } from "app/components/modal/centerModal";
import { SelectWithTag } from "app/components/selectWithTag";

const WarehouseCheckInOut = () => {
	const [selectedRow, setSelectedRow] = useState<any[]>([]);
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [fetchData, setFetchData] = useState<PaginationState>();

	return (
		<>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TableSelectionPaginateAndSort
							title={"Formulir Izin keluar dan masuk gudang"}
							contentHeader={
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "1em",
									}}
								>
									<div className="btn-group">
										<button className="btn btn-secondary">Excel</button>
										<button className="btn btn-secondary">PDF</button>
									</div>
									<div style={{ display: "flex", columnGap: 5 }}>
										<button
											type="button"
											className="btn btn-primary"
											data-bs-toggle="modal"
											data-bs-target="#modal_cetak"
										>
											Cetak
										</button>
									</div>
								</div>
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
				modalName="modal_cetak"
				title="Cetak"
				contentFooter={
					<button
						type="button"
						className="btn btn-primary"
						data-bs-dismiss="modal"
					>
						Cetak
					</button>
				}
			>
				<div className="col-12">
					<div className="form-group">
						<h6>Nomor</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Tanggal</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Nama Pemohon</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Jabatan Pemohon</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>NIPG Pemohon</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Satuan Kerja Pemohon</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Nama Penerima</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Jabatan Penerima</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>NIPG Penerima</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Permohonan</h6>
						<select className="form-select" name="jenis_barang">
							<option value="masuk">Masuk</option>
							<option value="keluar">Keluar</option>
						</select>
					</div>
					<div className="form-group">
						<h6>Cetak ke</h6>
						<select className="form-select" name="jenis_barang">
							<option value="excel">Excel</option>
							<option value="pdf">PDF</option>
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
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Lokasi</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">No HBB / Inventaris</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Nama Barang</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Kondisi</h6>
				<SelectWithTag />
			</SideModal>
		</>
	);
};

export default WarehouseCheckInOut;
