import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ICountry,
	ICountryGetAllParams,
	ICountryPaginateResponse,
	ICreateCountryRequest,
} from "store/types/countryTypes";
import {
	createNewCountryApi,
	deleteCountryApi,
	getAllCountryApi,
	getDetailCountryApi,
	updateCountryApi,
} from "api/country";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Space,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { CheckAuthentication } from "app/helper/authentication";
import { ModalFilter } from "./components/modalFilter";
import { listCheckPermission } from "app/helper/permission";

const MasterCountry = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<ICountryGetAllParams | undefined>({
		per_page: 10,
	});
	const [showModal, setShowModal] = useState<{ show: boolean; id?: number }>({
		show: false,
	});
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [initialValue, setInitialValue] = useState<ICreateCountryRequest>({
		name: "",
	});
	const [dataTable, setDataTable] = useState<ICountryPaginateResponse>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllCountryApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailCountryApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: ICountry) => {
		setInitialValue({ name: values.name || "" });
		formRef.current?.setFieldsValue({ name: values.name || "" });
	};

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		setParams({
			...params,
			...selectedPageAndSort,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPageAndSort]);

	useEffect(() => {
		if (showModal.show && showModal.id) {
			fetchDataDetail(showModal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const handleAdd = () => {
		setShowModal({ show: true });
		setInitialValue({ name: "" });
		formik.resetForm();
		formRef.current?.resetFields();
	};

	const handleDelete = (id: number) => {
		const swalCustom = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success m-1",
				cancelButton: "btn btn-danger m-1",
			},
			buttonsStyling: false,
		});

		swalCustom
			.fire({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Delete",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then(result => {
				if (result.isConfirmed) {
					deleteCountryApi(id).then(res => {
						if (res.data.status === "success") {
							swalCustom.fire("Delete", "Data ini telah dihapus.", "success");
							fetchDataList();
						} else {
							swalCustom.fire("Error", "Telah terjadi kesalahan", "error");
						}
					});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalCustom.fire("Batal", "Data ini batal dihapus", "error");
				}
			});
	};

	const onFinish = (values: any) => {
		if (showModal.id) {
			updateCountryApi(showModal.id, values).then(res => {
				if (res.data.status === "success") {
					setShowModal({ show: false });
					fetchDataList();
				}
				Swal.fire({
					icon: res.data.status,
					title: res.data.message,
					showConfirmButton: false,
					timer: 3000,
				});
			});
		} else {
			createNewCountryApi(values).then(res => {
				if (res.data.status === "success") {
					setShowModal({ show: false });
					fetchDataList();
				}
				Swal.fire({
					icon: res.data.status,
					title: res.data.message,
					showConfirmButton: false,
					timer: 3000,
				});
			});
		}
	};

	const handleCancel = () => {
		setShowModal({ show: false });
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Negara"
							columns={columns({ setShowModal, handleDelete })}
							dataSource={dataTable}
							setSelectedPageAndSort={setSelectedPageAndSort}
							contentHeader={
								<Space
									style={{
										display: "flex",
										justifyContent: "end",
										marginBottom: "1em",
									}}
								>
									<button
										className="btn btn-secondary"
										onClick={() => setShowFilter(true)}
									>
										<i className="fa fa-filter" />
									</button>
									{listCheckPermission.isAllowCreateMasterCountry && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={handleAdd}
										>
											Tambah
										</button>
									)}
								</Space>
							}
						/>
					</div>
				</div>
			</section>

			<AntdModal
				title={
					<Title level={3}>
						{showModal.show && showModal.id ? "Edit Data" : "Tambah Data"}
					</Title>
				}
				footer={
					<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
						<Button shape="round" size="large" onClick={handleCancel}>
							Close
						</Button>
						<Button
							type="primary"
							size="large"
							shape="round"
							onClick={form.submit}
						>
							Save
						</Button>
					</div>
				}
				onCancel={handleCancel}
				open={showModal.show}
				width={800}
				destroyOnClose
			>
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Divider />
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Nama Negara <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nama Negara"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
							</div>
						</div>
					</Form.Item>
				</Form>
			</AntdModal>

			<ModalFilter
				isShow={showFilter}
				setShowModal={setShowFilter}
				setParams={setParams}
			/>
		</MainLayout>
	);
};

export default MasterCountry;
