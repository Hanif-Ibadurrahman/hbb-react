import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/table/columnAndDataType";
import { PaginationState } from "store/types/paginationTypes";
import { SideModal } from "app/components/modal/SideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { CenterModal } from "app/components/modal/CenterModal";

const MasterUser = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nama_user: `Group Head, Procurement`,
				bisnis_unit: `Kantor Pusat`,
				area: `Ketapang`,
				role: `Role ${i}`,
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
							title="User"
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
							Nama User <span className="text-danger">*</span>
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
						<div className="form-group">
							<h6>
								Role <span className="text-danger">*</span>
							</h6>
							<div className="controls">
								<select
									className="form-select"
									name="role"
									required
									data-validation-required-message="This field is required"
								>
									<option value="superadmin">Super Administration</option>
									<option value="user">User</option>
									<option value="pengelola">Pengelola</option>
								</select>
							</div>
						</div>
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
									<option value="jakarta">Jakarta</option>
									<option value="bogor">Bogor</option>
									<option value="medan">Medan</option>
								</select>
							</div>
						</div>
						<h6>
							Username <span className="text-danger">*</span>
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
						<h6>
							Password <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<input
								type="password"
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
							Nama User <span className="text-danger">*</span>
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
						<div className="form-group">
							<h6>
								Role <span className="text-danger">*</span>
							</h6>
							<div className="controls">
								<select
									className="form-select"
									name="role"
									required
									data-validation-required-message="This field is required"
								>
									<option value="superadmin">Super Administration</option>
									<option value="user">User</option>
									<option value="pengelola">Pengelola</option>
								</select>
							</div>
						</div>
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
									<option value="jakarta">Jakarta</option>
									<option value="bogor">Bogor</option>
									<option value="medan">Medan</option>
								</select>
							</div>
						</div>
						<h6>
							Username <span className="text-danger">*</span>
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
						<h6>
							Password <span className="text-danger">*</span>
						</h6>
						<div className="controls">
							<input
								type="password"
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
				<h6 className="box-title mt-10 d-block mb-10">Nama User</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Area</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Role</h6>
				<SelectWithTag colorTag="cyan" />
			</SideModal>
		</MainLayout>
	);
};

export default MasterUser;
