import { TablePaginateAndSort } from "app/components/Table/Antd/TablePaginateAndSort";
import { MainLayout } from "app/layout/MainLayout";
import { useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { SideModal } from "app/components/Modal/SideModal";
import { SelectWithTag } from "app/components/SelectWithTag";
import { CenterModal } from "app/components/Modal/CenterModal";

const MasterBarang = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nama_barang: `Barang ${i}`,
				merk: "Sharp",
				tipe: "XQ 380",
				jenis: "0",
				model: "injection",
				warna: "Hitam",
				kapasitas: "0",
				ukuran: "0",
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
						<TablePaginateAndSort
							title="Barang"
							dataSource={fetchData}
							columns={columns}
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

			<CenterModal
				modalName="modal_edit"
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

export default MasterBarang;
