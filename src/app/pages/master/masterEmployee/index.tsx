import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { CenterModal } from "app/components/modal/centerModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";
import { getAllEmployeeApi } from "api/employee";

const MasterEmployee = () => {
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [params, setParams] = useState<IEmployeeGetAllParams | undefined>();
	const [tempFilter, setTempFilter] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [dataTable, setDataTable] = useState();

	const fetchDataList = async () => {
		try {
			const response = await getAllEmployeeApi(params);
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
							title="Pegawai"
							dataSource={dataTable}
							columns={columns({ setShowModal })}
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
							Nama <span className="text-danger">*</span>
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
					<div className="form-group">
						<h6>Jabatan</h6>
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
						onClick={setValueFilter}
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Nama</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ emp_name: v.toString() })}
				/>
				<h6 className="box-title mt-10 d-block mb-10">NIPG</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ nipg: v.toString() })}
				/>
				<h6 className="box-title mt-10 d-block mb-10">Jabatan</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ jabatan: v.toString() })}
				/>
			</SideModal>
		</MainLayout>
	);
};

export default MasterEmployee;
