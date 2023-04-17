import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ISubCodeGroup,
	ISubCodeGroupGetAllParams,
	ISubCodeGroupPaginateResponse,
	ICreateSubCodeGroupRequest,
} from "store/types/subCodeGroupTypes";
import {
	createNewSubCodeGroupApi,
	deleteSubCodeGroupApi,
	getAllSubCodeGroupApi,
	getDetailSubCodeGroupApi,
	updateSubCodeGroupApi,
} from "api/subCodeGroup";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Typography,
} from "antd";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { CheckAuthentication } from "app/helper/authentication";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalFilter } from "./components/modalFilter";

const MasterSubCodeGroup = () => {
	const { Title } = Typography;
	const navigate = useNavigate();
	const location = useLocation();
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<ISubCodeGroupGetAllParams | undefined>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [selectedPage, setSelectedPage] = useState<{
		page: number;
		pageSize: number;
	}>({ page: 1, pageSize: 20 });
	const [initialValue, setInitialValue] = useState<ICreateSubCodeGroupRequest>({
		id_main_group: "",
		value: "",
		code: "",
	});
	const [dataTable, setDataTable] = useState<ISubCodeGroupPaginateResponse>();

	const fetchDataList = async () => {
		try {
			if (params) {
				if (location.state === null) {
					navigate("/master-kode-group", { replace: true });
				}
				const mainGroupId = location.state.mainGroupData.id;
				const response = await getAllSubCodeGroupApi(mainGroupId, params);
				const data = {
					...response.data.data,
					data: response.data.data.data.map(d => ({
						...d,
						mainGroupName: location.state.mainGroupData.value,
						mainGroupCode: location.state.mainGroupData.code,
					})),
				};
				setDataTable(data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailSubCodeGroupApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: ISubCodeGroup) => {
		const setData = {
			id_main_group: "",
			value: values.value || "",
			code: values.code || "",
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
			id_main_group: "",
			value: "",
			code: "",
		});
		formik.resetForm();
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
					deleteSubCodeGroupApi(id).then(res => {
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
			updateSubCodeGroupApi(showModal.id, values).then(res => {
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
			const input = {
				...values,
				id_main_group: location.state.mainGroupData.id,
			};
			createNewSubCodeGroupApi(input).then(res => {
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
							title="Sub Group"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<>
									<button
										className="btn btn-secondary"
										onClick={() => setShowFilter(true)}
									>
										<i className="fa fa-filter">Filter</i>
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={handleAdd}
									>
										Tambah
									</button>
								</>
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
			>
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Divider />
					<Form.Item
						name="value"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Sub Group <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="value"
									className="form-control"
									placeholder="Group"
									onChange={formik.handleChange}
									value={formik.values.value}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item
						name="code"
						rules={[
							{
								required: true,
								max: 2,
								message: "Harap isi field ini dan tidak lebih dari 2 karakter",
							},
						]}
					>
						<div className="form-group">
							<Title level={5}>
								Code <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="code"
									className="form-control"
									placeholder="Code"
									onChange={formik.handleChange}
									value={formik.values.code}
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

export default MasterSubCodeGroup;
