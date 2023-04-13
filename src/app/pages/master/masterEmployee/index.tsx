import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import {
	ICreateEmployeeRequest,
	IEmployee,
	IEmployeeGetAllParams,
	IEmployeePaginateResponse,
} from "store/types/employeeTypes";
import {
	createNewEmployeeApi,
	deleteEmployeeApi,
	getAllEmployeeApi,
	getDetailEmployeeApi,
	updateEmployeeApi,
} from "api/employee";
import { Modal as AntdModal, Button, Form, FormInstance, Input } from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const MasterEmployee = () => {
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [params, setParams] = useState<IEmployeeGetAllParams | undefined>();
	const [tempFilter, setTempFilter] = useState<
		IEmployeeGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [initialValue, setInitialValue] = useState<ICreateEmployeeRequest>({
		emp_name: "",
		nipg: "",
		jabatan: "",
	});
	const [dataTable, setDataTable] = useState<IEmployeePaginateResponse>();

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllEmployeeApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailEmployeeApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			// CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IEmployee) => {
		const setData = {
			emp_name: values.emp_name || "",
			nipg: values.nipg || "",
			jabatan: values.jabatan || "",
		};
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
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
		setInitialValue({
			emp_name: "",
			nipg: "",
			jabatan: "",
		});
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
					deleteEmployeeApi(id).then(res => {
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
			updateEmployeeApi(showModal.id, values).then(res => {
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
			createNewEmployeeApi(values).then(res => {
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
							title="Pegawai"
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
				width={800}
			>
				<div className="col-12">
					<Form form={form} ref={formRef} onFinish={onFinish}>
						<Form.Item
							name="emp_name"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<span>
									Nama <span className="text-danger">*</span>
								</span>
								<div className="controls">
									<Input
										type="text"
										name="emp_name"
										className="form-control"
										placeholder="Nama Negara"
										onChange={formik.handleChange}
										value={formik.values.emp_name}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item
							name="nipg"
							rules={[
								{
									required: true,
									message: "Harap isi field ini",
								},
							]}
						>
							<div className="form-group">
								<span>
									NIPG <span className="text-danger">*</span>
								</span>
								<div className="controls">
									<Input
										type="text"
										name="nipg"
										className="form-control"
										placeholder="NIPG"
										onChange={formik.handleChange}
										value={formik.values.nipg}
									/>
								</div>
							</div>
						</Form.Item>
						<Form.Item name="jabatan">
							<div className="form-group">
								<span>Jabatan</span>
								<div className="controls">
									<Input
										type="text"
										name="jabatan"
										className="form-control"
										placeholder="Jabatan"
										onChange={formik.handleChange}
										value={formik.values.jabatan}
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
