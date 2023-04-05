import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/table/columnAndDataType";
import { PaginationState } from "store/types/paginationTypes";
import { CenterModal } from "app/components/modal/CenterModal";
import { SideModal } from "app/components/modal/SideModal";
import { SelectWithTag } from "app/components/selectWithTag";

const MasterArea = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nama_area: "Balikpapan",
				daerah: "Balikpapan",
				pengelola: "Hendra Frayudi",
				nipg: "nipg",
				pemegang: "Andaya Endy Saputra",
				bisnis_unit: `Bisnis Unit ${i}`,
			});
		}
		// setFetchData({
		// 	total: 100,
		// 	per_page: 10,
		// 	current_page: 1,
		// 	last_page: 10,
		// 	first_page_url: "",
		// 	last_page_url: "",
		// 	next_page_url: "",
		// 	prev_page_url: "",
		// 	path: "",
		// 	from: 1,
		// 	to: 10,
		// 	data: data,
		// });
	}, []);

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Area / Direktorat"
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
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Nama Area</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Daerah</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Pengelola</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">NIPG</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Pemegang</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default MasterArea;
