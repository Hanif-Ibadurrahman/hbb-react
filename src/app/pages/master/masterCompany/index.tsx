import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { CenterModal } from "app/components/modal/centerModal";
import { ICountryGetAllParams } from "store/types/countryTypes";
import {
	createNewCompanyApi,
	getAllCompanyApi,
	getDetailCompanyApi,
	updateCompanyApi,
} from "api/company";
import { Modal as AntdModal, Button, Form, FormInstance, Input } from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { ICompany } from "store/types/companyTypes";
import { deleteCountryApi } from "api/country";

const MasterCompany = () => {
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [params, setParams] = useState<ICountryGetAllParams | undefined>();
	const [tempFilter, setTempFilter] = useState<
		ICountryGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [initialValue, setInitialValue] = useState<{
		name: string;
		code: string;
	}>();
	const [dataTable, setDataTable] = useState();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllCompanyApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailCompanyApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: ICompany) => {
		setInitialValue({ name: values.name || "", code: values.code || "" });
		formRef.current?.setFieldsValue({ name: values.name || "" });
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
		setInitialValue({ name: "", code: "" });
		formRef.current?.resetFields();
	};

	const handleDelete = (id: string) => {
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
			updateCompanyApi(showModal.id, values).then(res => {
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
			createNewCompanyApi(values).then(res => {
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

	const setValueFilter = () => {
		setParams({ ...params, ...tempFilter });
	};

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Perusahaan"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleAdd}
								>
									Tambah
								</button>
							}
						/>
					</div>
				</div>
			</section>

			<AntdModal
				title={showModal.show && showModal.id ? "Edit Data" : "Tambah Data"}
				footer={
					<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
						<Button type="primary" danger onClick={handleCancel}>
							Close
						</Button>
						<Button type="primary" onClick={form.submit}>
							Simpan
						</Button>
					</div>
				}
				onCancel={handleCancel}
				open={showModal.show}
			>
				<div className="col-12">
					<Form form={form} ref={formRef} onFinish={onFinish}>
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
								<span>
									Nama Perusahaan <span className="text-danger">*</span>
								</span>
								<div className="controls">
									<Input
										type="text"
										name="name"
										className="form-control"
										placeholder="Nama Perusahaan"
										onChange={formik.handleChange}
										value={formik.values.name}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="code"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<span>
									Kode <span className="text-danger">*</span>
								</span>
								<div className="controls">
									<Input
										type="text"
										name="code"
										className="form-control"
										placeholder="Kode"
										onChange={formik.handleChange}
										value={formik.values.code}
									/>
								</div>
							</div>
						</Form.Item>
					</Form>
				</div>
			</AntdModal>

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
				<h6 className="box-title mt-10 d-block mb-10">Nama Perusahaan</h6>
				<SelectWithTag
					colorTag="cyan"
					onChange={v => setTempFilter({ name: v.toString() })}
				/>
			</SideModal>
		</MainLayout>
	);
};

export default MasterCompany;
