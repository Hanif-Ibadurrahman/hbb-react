import { MainLayout } from "app/layout/MainLayout";
import { TableSelectionPaginateAndSort } from "app/components/Table/Antd/TableSelectionPaginateAndSort";
import { useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { SideModal } from "app/components/Modal/SideModal";
import { CenterModal } from "app/components/Modal/CenterModal";
import { SelectWithTag } from "app/components/SelectWithTag";
import { Input, InputNumber, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const HbbInventory = () => {
	const { Dragger } = Upload;
	const { TextArea } = Input;
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
					<div className="form-group">
						<h6>No Akuntansi</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Nomor BAST/DO</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Tanggal BAST/DO</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>
							Negara Pembuat <span className="text-danger">*</span>
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
						<h6>Tahun Pembuatan</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
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
						<h6>
							Warna <span className="text-danger">*</span>
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
					<div className="form-group">
						<h6>No Seri</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Polisi</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Rangka</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Mesin</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No BPKB</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Kontrak</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Tanggal Kontrak</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Harga Perolehan</h6>
						<div className="controls">
							<InputNumber
								addonBefore="Rp"
								style={{ width: "100%" }}
								onKeyPress={e => {
									if (!/\d+/.test(e.key)) {
										e.preventDefault();
									}
								}}
								formatter={value =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
								}
								parser={value => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Bisnis Unit <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="sor_1">SOR I</option>
								<option value="sor_2">SOR II</option>
								<option value="sor_3">SOR III</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Area <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="medan">Medan</option>
								<option value="jakarta">Jakarta</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Satuan Kerja <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="dewan_komisaris">Dewan Komisaris</option>
								<option value="direktorat_utama">Direktorat Utama</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Lokasi <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="pantry">Pantry</option>
								<option value="diklat_baru">Diklat Baru</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>Penanggung Jawab</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Kondisi</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="pinjam">Pinjam</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>Keterangan</h6>
						<div className="controls">
							<TextArea rows={3} />
						</div>
					</div>
					<Dragger name="file" multiple={true}>
						Upload
					</Dragger>
				</div>
			</CenterModal>

			<CenterModal
				modalName="modal_edit"
				title="Edit Data"
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
					<div className="form-group">
						<h6>No Akuntansi</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Nomor BAST/DO</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Tanggal BAST/DO</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>
							Negara Pembuat <span className="text-danger">*</span>
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
						<h6>Tahun Pembuatan</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
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
						<h6>
							Warna <span className="text-danger">*</span>
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
					<div className="form-group">
						<h6>No Seri</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Polisi</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Rangka</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Mesin</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No BPKB</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>No Kontrak</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Tanggal Kontrak</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Harga Perolehan</h6>
						<div className="controls">
							<InputNumber
								addonBefore="Rp"
								style={{ width: "100%" }}
								onKeyPress={e => {
									if (!/\d+/.test(e.key)) {
										e.preventDefault();
									}
								}}
								formatter={value =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
								}
								parser={value => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Bisnis Unit <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="sor_1">SOR I</option>
								<option value="sor_2">SOR II</option>
								<option value="sor_3">SOR III</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Area <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="medan">Medan</option>
								<option value="jakarta">Jakarta</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Satuan Kerja <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="dewan_komisaris">Dewan Komisaris</option>
								<option value="direktorat_utama">Direktorat Utama</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Lokasi <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="pantry">Pantry</option>
								<option value="diklat_baru">Diklat Baru</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>Penanggung Jawab</h6>
						<div className="controls">
							<input type="text" name="text" className="form-control" />
						</div>
					</div>
					<div className="form-group">
						<h6>Kondisi</h6>
						<div className="controls">
							<select className="form-select" name="jenis_barang">
								<option value="pinjam">Pinjam</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>Keterangan</h6>
						<div className="controls">
							<TextArea rows={3} />
						</div>
					</div>
					<Dragger name="file" multiple={true}>
						Upload
					</Dragger>
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
				<h6 className="box-title mt-10 d-block mb-10">Ukuran</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No Seri</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No Polisi</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No Rangka</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No Mesin</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No BPKB</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No Kontrak</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Tanggal Kontrak</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Area</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Satuan Kerja</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Lokasi</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Penanggung Jawab</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Kondisi</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Rentang Waktu</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Tahun Perolehan</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No HBB</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default HbbInventory;
