import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/SideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { CenterModal } from "app/components/modal/CenterModal";
import {
	ICountryGetAllParams,
	ICreateCountryRequest,
} from "store/types/countryTypes";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	createNewCountryAction,
	getCountryListAction,
} from "actions/countryAction";
import { countrySelector } from "store/selector/countrySelector";
import { createNewCountryApi, getAllCountryApi } from "api/country";
import Swal from "sweetalert2";
import { CheckAuthentication } from "app/helper/authentication";

const MasterNegara = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [params, setParams] = useState<ICountryGetAllParams | undefined>();
	const [, setSelectedPage] = useState<number>(1);
	const [dataTable, setDataTable] = useState();

	const country = useSelector(countrySelector);

	const fetchData = async () => {
		try {
			const response = await getAllCountryApi(params);
			setDataTable(response.data.data);
			// await dispatch(getCountryListAction(params));
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const onFinish = async (values: ICreateCountryRequest) => {
		try {
			// await dispatch(createNewCountryAction(values));
			const response = await createNewCountryApi(values);

			Swal.fire({
				icon: response.data.status,
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Opps... Something went wrong",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Negara"
							columns={columns}
							dataSource={dataTable}
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
						onClick={form.submit}
					>
						Simpan
					</button>
				}
			>
				<div className="col-12">
					<Form
						form={form}
						onFinish={onFinish}
						// initialValues={{ name: "Indonesia" }}
					>
						<Form.Item
							name="name"
							rules={[
								{
									required: true,
									message: "Please fill this field",
								},
							]}
						>
							<div className="form-group">
								<h6>
									Nama Negara <span className="text-danger">*</span>
								</h6>
								<div className="controls">
									<Input
										type="text"
										className="form-control"
										placeholder="Nama Negara"
									/>
								</div>
							</div>
						</Form.Item>
					</Form>
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
