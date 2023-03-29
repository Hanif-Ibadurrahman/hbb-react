import { MainLayout } from "app/layout/MainLayout";
import { TableSelectionPaginateAndSort } from "app/components/Table/Antd/TableSelectionPaginateAndSort";
import { useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { SideModal } from "app/components/Modal/SideModal";
import { CenterModal } from "app/components/Modal/CenterModal";

const HbbInventory = () => {
	const [selectedRow, setSelectedRow] = useState<any[]>([]);
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				name_barang: `Barang ${i}`,
				mg: "04",
				sg: "01",
				th: "01",
				no_item: "0066",
				no: "0401010066",
				jenis_barang: "HBB",
				lokasi:
					"Tangerang - Area Tangerang dan Sekitarnya - Gudang Peralatan, Offtake Serpong",
				kondisi: "Baik",
			});
		}
		setFetchData({
			total: 100,
			per_page: 10,
			current_page: 1,
			last_page: 10,
			first_page_url: "",
			last_page_url: "",
			next_page_url: "",
			prev_page_url: "",
			path: "",
			from: 1,
			to: 10,
			data: data,
		});
	}, []);

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TableSelectionPaginateAndSort
							title={"HBB dan Inventaris"}
							contentHeader={
								<>
									<button
										type="button"
										className="btn"
										disabled={!selectedRow.length}
										style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
									>
										Hapus
									</button>
									<button
										type="button"
										className="btn btn-primary"
										data-bs-toggle="modal"
										data-bs-target="#modal_add"
									>
										Tambah
									</button>
								</>
							}
							columns={columns}
							rowKey={"name_barang"}
							dataSource={fetchData}
							setSelectedRow={setSelectedRow}
							setSelectedPage={setSelectedPage}
						/>
					</div>
				</div>
			</section>

			<CenterModal
				modalName="modal_add"
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

			<CenterModal
				modalName="modal_edit"
				title="Ubah Data"
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
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Main Group</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Sub Group</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Tahun Perolehan</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Nama Barang</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Distributor</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">No Akuntansi</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">No BAST/DO</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				{/* <h6 className="box-title mt-10 d-block mb-10">Negara Pembuat</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Tahun Pembuatan</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Merk</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Jenis</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Model</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Warna</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div>
				<h6 className="box-title mt-10 d-block mb-10">Kapasitas</h6>
				<div className="tags-default">
					<input type="text" data-role="tagsinput" placeholder="Input" />
				</div> */}
			</SideModal>
		</MainLayout>
	);
};

export default HbbInventory;
