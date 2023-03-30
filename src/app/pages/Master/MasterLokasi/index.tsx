import { TablePaginateAndSort } from "app/components/Table/Antd/TablePaginateAndSort";
import { MainLayout } from "app/layout/MainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { PaginationState } from "store/Types/PaginationTypes";
import { SideModal } from "app/components/Modal/SideModal";
import { SelectWithTag } from "app/components/SelectWithTag";
import { CenterModal } from "app/components/Modal/CenterModal";

const MasterLokasi = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				bisnis_unit: `SOR ${i}`,
				area: "Bojonegoro",
				satuan_kerja: "Area Bojonegoro dan sekitarnya",
				nama_lokasi: "Pantry Kantor Area Lamongan",
				nama_penanggung_jawab: "Mochamad Arif",
				nipg: "2099761746",
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
							title="Lokasi"
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
							Bisnis Unit <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select
								className="form-select"
								name="bisnis_unit"
								required
								data-validation-required-message="This field is required"
							>
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
							<select
								className="form-select"
								name="area"
								required
								data-validation-required-message="This field is required"
							>
								<option value="bojonegoro">Bokonegoro</option>
								<option value="jakarta">Jakarta</option>
								<option value="bogor">Bogor</option>
								<option value="medan">Medan</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Satuan Kerja <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select
								className="form-select"
								name="satuan_kerja"
								required
								data-validation-required-message="This field is required"
							>
								<option value="area_bojonegoro_dan_sekitarnya">
									Area Bojonegoro dan Sekitarnya
								</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Lokasi <span className="text-danger">*</span>
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
							Penanggung Jawab <span className="text-danger">*</span>
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
							NIPG <span className="text-danger">*</span>
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
						<h6>
							Bisnis Unit <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select
								className="form-select"
								name="bisnis_unit"
								required
								data-validation-required-message="This field is required"
							>
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
							<select
								className="form-select"
								name="area"
								required
								data-validation-required-message="This field is required"
							>
								<option value="bojonegoro">Bokonegoro</option>
								<option value="jakarta">Jakarta</option>
								<option value="bogor">Bogor</option>
								<option value="medan">Medan</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Satuan Kerja <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<select
								className="form-select"
								name="satuan_kerja"
								required
								data-validation-required-message="This field is required"
							>
								<option value="area_bojonegoro_dan_sekitarnya">
									Area Bojonegoro dan Sekitarnya
								</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<h6>
							Lokasi <span className="text-danger">*</span>
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
							Penanggung Jawab <span className="text-danger">*</span>
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
							NIPG <span className="text-danger">*</span>
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
				<h6 className="box-title mt-10 d-block mb-10">NIPG</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default MasterLokasi;
