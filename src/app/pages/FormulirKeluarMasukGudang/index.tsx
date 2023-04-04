import { MainLayout } from "app/layout/MainLayout";
import { TableSelectionPaginateAndSort } from "app/components/Table/Antd/TableSelectionPaginateAndSort";
import { useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { SideModal } from "app/components/Modal/SideModal";
import { CenterModal } from "app/components/Modal/CenterModal";
import { SelectWithTag } from "app/components/SelectWithTag";

const FormulirKeluarMasukGudang = () => {
	const [selectedRow, setSelectedRow] = useState<any[]>([]);
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				satuan_kerja: "Asset and Facility Management",
				lokasi:
					"Tangerang - Area Tangerang dan Sekitarnya - Gudang Peralatan, Offtake Serpong",
				no: "0401010066",
				name_barang: `Barang ${i}`,
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
							title={"Formulir Izin keluar dan masuk gudang"}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									data-bs-toggle="modal"
									data-bs-target="#modal_cetak"
								>
									Cetak
								</button>
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
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">No HBB / Inventaris</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Nama Barang</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Kondisi</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default FormulirKeluarMasukGudang;
