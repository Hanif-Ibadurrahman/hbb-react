import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/table/columnAndDataType";
import {
	ICreateItemRequest,
	IItem,
	IItemGetAllParams,
} from "store/types/itemTypes";
import {
	createNewItemApi,
	deleteItemApi,
	getAllItemApi,
	getDetailItemApi,
	updateItemApi,
} from "api/item";
import { CheckAuthentication, TokenDekode } from "app/helper/authentication";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Select,
	Typography,
} from "antd";
import Swal from "sweetalert2";
import { DefaultOptionType } from "antd/es/select";
import { ICodeGroupGetAllParams } from "store/types/codeGroupTypes";
import { ISubCodeGroupGetAllParams } from "store/types/subCodeGroupTypes";
import { getAllCodeGroupApi } from "api/codeGroup";
import { getAllSubCodeGroupApi } from "api/subCodeGroup";
import { useFormik } from "formik";
import { getAllColorApi } from "api/color";
import { IColorGetAllParams } from "store/types/colorTypes";
import { ModalFilter } from "./components/modalFilter";

const MasterItem = () => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState<IItemGetAllParams | undefined>();
	const [codeGroupParams, setCodeGroupParams] = useState<
		ICodeGroupGetAllParams | undefined
	>();
	const [subCodeGroupParams, setSubCodeGroupParams] = useState<
		ISubCodeGroupGetAllParams | undefined
	>();
	const [colorParams, setColorParams] = useState<
		IColorGetAllParams | undefined
	>();
	const [showModal, setShowModal] = useState<{ show: boolean; id?: string }>({
		show: false,
	});
	const [initialValue, setInitialValue] = useState<ICreateItemRequest>({
		name: "",
		id_area: "",
		id_company: "",
		id_main_group: "",
		id_sub_group: "",
		jenis: "",
		kapasitas: "",
		merk: "",
		model: "",
		satuan: "",
		tipe: "",
		ukuran: "",
		warna: "",
	});
	const [dataTable, setDataTable] = useState();
	const [dataOptionCodeGroup, setDataOptionCodeGroup] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionSubCodeGroup, setDataOptionSubCodeGroup] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionColor, setDataOptionColor] = useState<
		DefaultOptionType[] | undefined
	>();

	const tokenDecode = TokenDekode();

	useEffect(() => {
		fetchDataList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const fetchDataDetail = async (id: string) => {
		try {
			const response = await getDetailItemApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const handleInitialValue = (values: IItem) => {
		setInitialValue({
			name: values.name || "",
			id_area: values.id_area || "",
			id_main_group: values.id_main_group || "",
			id_sub_group: values.id_sub_group || "",
			id_company: values.id_company || "",
			jenis: values.jenis || "",
			merk: values.merk || "",
			model: values.model || "",
			satuan: values.satuan || "",
			tipe: values.tipe || "",
			ukuran: values.ukuran || "",
			kapasitas: values.kapasitas || "",
			warna: values.warna || "",
		});
		formRef.current?.setFieldsValue({
			name: values.name || "",
			id_area: values.id_area || "",
			id_main_group: values.id_main_group || "",
			id_sub_group: values.id_sub_group || "",
			id_company: values.id_company || "",
			jenis: values.jenis || "",
			merk: values.merk || "",
			model: values.model || "",
			satuan: values.satuan || "",
			tipe: values.tipe || "",
			ukuran: values.ukuran || "",
			kapasitas: values.kapasitas || "",
			warna: values.warna || "",
		});
	};

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataCodeGroup = async () => {
		try {
			const response = await getAllCodeGroupApi(codeGroupParams);
			const codeGroupList = response.data.data.data;
			setDataOptionCodeGroup(
				codeGroupList.map(v => ({ label: v.value, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataSubCodeGroup = async (id: string) => {
		try {
			const response = await getAllSubCodeGroupApi(id, subCodeGroupParams);
			const areaList = response.data.data.data;
			setDataOptionSubCodeGroup(
				areaList.map(v => ({ label: v.value, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	const fetchDataColor = async () => {
		try {
			const response = await getAllColorApi(colorParams);
			const colorList = response.data.data.data;
			setDataOptionColor(
				colorList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

	useEffect(() => {
		fetchDataCodeGroup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codeGroupParams]);

	useEffect(() => {
		const mainGroupId = formik.values.id_main_group;
		if (mainGroupId) {
			fetchDataSubCodeGroup(mainGroupId);
		}

		if (showModal.id) {
			setInitialValue({
				...initialValue,
				id_sub_group: "",
			});
			formik.setFieldValue("id_sub_group", "");
			formRef.current?.setFieldsValue({
				id_sub_group: "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subCodeGroupParams, formik.values.id_main_group]);

	useEffect(() => {
		fetchDataColor();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colorParams]);

	const fetchDataList = async () => {
		try {
			if (params) {
				const response = await getAllItemApi(params);
				setDataTable(response.data.data);
			}
		} catch (error: any) {
			CheckAuthentication(error);
		}
	};

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

	const handleAdd = () => {
		setShowModal({ show: true });
		setInitialValue({
			name: "",
			id_area: "",
			id_company: "",
			id_main_group: "",
			id_sub_group: "",
			jenis: "",
			kapasitas: "",
			merk: "",
			model: "",
			satuan: "",
			tipe: "",
			ukuran: "",
			warna: "",
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
					deleteItemApi(id).then(res => {
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
			updateItemApi(showModal.id, values).then(res => {
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
			const input: ICreateItemRequest = {
				...values,
				id_company: tokenDecode.user?.id_company,
			};
			createNewItemApi(input).then(res => {
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
							title="Barang"
							dataSource={dataTable}
							columns={columns({ setShowModal, handleDelete })}
							setSelectedPageAndSort={setSelectedPageAndSort}
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
					<Form.Item name="id_main_group">
						<div className="form-group">
							<Title level={5}>Main Group</Title>
							<div className="controls">
								<Select
									showSearch
									placeholder="Pilih Main Group"
									onSearch={v => setCodeGroupParams({ value: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionCodeGroup}
									onChange={(v, opt) => {
										formik.setFieldValue("id_main_group", v);
										formRef.current?.setFieldsValue({
											id_main_group: v,
										});
									}}
									value={formik.values.id_main_group}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_sub_group">
						<div className="form-group">
							<Title level={5}>Sub Group</Title>
							<div className="controls">
								<Select
									showSearch
									placeholder="Pilih Sub Group"
									onSearch={v => setSubCodeGroupParams({ value: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionSubCodeGroup}
									onChange={(v, opt) => {
										formik.setFieldValue("id_sub_group", v);
										formRef.current?.setFieldsValue({
											id_sub_group: v,
										});
									}}
									value={formik.values.id_sub_group}
								/>
							</div>
						</div>
					</Form.Item>
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
								Nama Barang <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nama Barang"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="merk">
						<div className="form-group">
							<Title level={5}>Merk</Title>
							<div className="controls">
								<Input
									type="text"
									name="merk"
									className="form-control"
									placeholder="Merk"
									onChange={formik.handleChange}
									value={formik.values.merk}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="tipe">
						<div className="form-group">
							<Title level={5}>Tipe</Title>
							<div className="controls">
								<Input
									type="text"
									name="tipe"
									className="form-control"
									placeholder="Tipe"
									onChange={formik.handleChange}
									value={formik.values.tipe}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="jenis">
						<div className="form-group">
							<Title level={5}>Jenis</Title>
							<div className="controls">
								<Input
									type="text"
									name="jenis"
									className="form-control"
									placeholder="Jenis"
									onChange={formik.handleChange}
									value={formik.values.jenis}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="model">
						<div className="form-group">
							<Title level={5}>Model</Title>
							<div className="controls">
								<Input
									type="text"
									name="model"
									className="form-control"
									placeholder="Model"
									onChange={formik.handleChange}
									value={formik.values.model}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="warna">
						<div className="form-group">
							<Title level={5}>Warna</Title>
							<div className="controls">
								<Select
									showSearch
									placeholder="Pilih Warna"
									onSearch={v => setColorParams({ name: v })}
									filterOption={(input, option) =>
										(`${option?.label}` ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={dataOptionColor}
									onChange={(v, opt) => {
										formik.setFieldValue("warna", v);
										formRef.current?.setFieldsValue({
											warna: v,
										});
									}}
									value={formik.values.warna}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="kapasitas">
						<div className="form-group">
							<Title level={5}>Kapasitas</Title>
							<div className="controls">
								<Input
									type="text"
									name="kapasitas"
									className="form-control"
									placeholder="Kapasitas"
									onChange={formik.handleChange}
									value={formik.values.kapasitas}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="ukuran">
						<div className="form-group">
							<Title level={5}>Ukuran</Title>
							<div className="controls">
								<Input
									type="text"
									name="ukuran"
									className="form-control"
									placeholder="Ukuran"
									onChange={formik.handleChange}
									value={formik.values.ukuran}
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

export default MasterItem;
