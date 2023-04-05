import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/SideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { CenterModal } from "app/components/modal/CenterModal";
import { ICountryGetAllParams } from "store/types/countryTypes";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCountryListAction } from "actions/countryAction";
import { countrySelector } from "store/selector/countrySelector";

const MasterNegara = () => {
	const dispatch = useDispatch();
	const [params, setParams] = useState<ICountryGetAllParams>({ name: "" });
	const [, setSelectedPage] = useState<number>(1);

	const country = useSelector(countrySelector);

	const fetchData = async () => {
		await dispatch(getCountryListAction(params));
	};

	useEffect(() => {
		fetchData();
		console.log(country);
		// console.log("getAllCountry", getAllCountry);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Negara"
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
							Nama Negara <span className="text-danger">*</span>
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
							Nama Negara <span className="text-danger">*</span>
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
				<Form>
					<h6 className="box-title mt-10 d-block mb-10">Nama Negara</h6>
					<SelectWithTag colorTag="cyan" />
				</Form>
			</SideModal>
		</MainLayout>
	);
};

export default MasterNegara;
