import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { CenterModal } from "app/components/modal/centerModal";
import { getAllUserApi } from "api/user";
import { IUserGetAllParams } from "store/types/userTypes";

const MasterUser = () => {
	const [params, setParams] = useState<IUserGetAllParams | undefined>();
	const [tempFilter, setTempFilter] = useState<IUserGetAllParams | undefined>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [initialValue, setInitialValue] = useState<string | null>();
	const [dataTable, setDataTable] = useState();

	const fetchDataList = async () => {
		try {
			const response = await getAllUserApi(params);
			setDataTable(response.data.data);
			// await dispatch(getCountryListAction(params));
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

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
							title="User"
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
						onClick={setValueFilter}
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Nama User</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ name: v.toString() })}
				/>
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
