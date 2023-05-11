import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import {
	Modal as AntdModal,
	Button,
	DatePicker,
	Divider,
	Form,
	FormInstance,
	Input,
	InputNumber,
	Select,
	Tabs,
	TabsProps,
	Typography,
} from "antd";
import { useFormik } from "formik";
import { CheckResponse } from "app/helper/authentication";
import { IInventoryDetail } from "store/types/inventoryTypes";
import { getDetailInventoryApi } from "api/inventory";
// import { DefaultOptionType } from "antd/es/select";
// import { getDetailCodeGroupApi } from "api/codeGroup";
// import { getDetailSubCodeGroupApi } from "api/subCodeGroup";
// import { getDetailCompanyApi } from "api/company";
// import { getDetailEmployeeApi } from "api/employee";
// import { getDetailBusinessUnitApi } from "api/businessUnit";
// import { getDetailColorApi } from "api/color";
// import { getDetailLocationApi } from "api/location";
// import { getDetailAreaApi } from "api/area";
// import { getDetailWorkUnitApi } from "api/workUnit";
// import { getDetailItemApi } from "api/item";
// import { getDetailConditionApi } from "api/condition";
// import { getDetailCountryApi } from "api/country";
import { removeNullFields } from "app/helper/common";
// import { getDetailDivisionApi } from "api/division";

interface IModalDetail {
	showModal: {
		show: boolean;
		id?: number | undefined;
	};
	setShowModal: Dispatch<
		SetStateAction<{
			show: boolean;
			id?: number | undefined;
		}>
	>;
}

const ModalDetail = ({ showModal, setShowModal }: IModalDetail) => {
	dayjs.extend(customParseFormat);
	const { Title } = Typography;
	const { TextArea } = Input;
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [initialValue, setInitialValue] =
		useState<NonNullable<IInventoryDetail>>();
	// const [dataOptionCodeGroup, setDataOptionCodeGroup] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionSubCodeGroup, setDataOptionSubCodeGroup] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionCountry, setDataOptionCountry] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionCompany, setDataOptionCompany] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionItem, setDataOptionItem] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionColor, setDataOptionColor] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionEmployee, setDataOptionEmployee] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionLocation, setDataOptionLocation] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionCondition, setDataOptionCondition] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionArea, setDataOptionArea] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionWorkUnit, setDataOptionWorkUnit] = useState<
	// 	DefaultOptionType[] | undefined
	// >();
	// const [dataOptionDivision, setDataOptionDivision] = useState<
	// 	DefaultOptionType[] | undefined
	// >();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailInventoryApi(id);
			handleInitialValue(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	// const fetchDataDivisionDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailDivisionApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionDivision(
	// 			dataOptionDivision?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataCodeGroupDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailCodeGroupApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionCodeGroup(
	// 			dataOptionCodeGroup?.concat({ label: detail.value, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataSubCodeGroupDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailSubCodeGroupApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionSubCodeGroup([{ label: detail.value, value: detail.id }]);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataCountryDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailCountryApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionCountry(
	// 			dataOptionCountry?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataEmployeeDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailEmployeeApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionEmployee(
	// 			dataOptionEmployee?.concat({
	// 				label: detail.emp_name,
	// 				value: detail.nipg,
	// 			}),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataItemDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailItemApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionItem(
	// 			dataOptionItem?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataConditionDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailConditionApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionCondition(
	// 			dataOptionCondition?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataLocationDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailLocationApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionLocation(
	// 			dataOptionLocation?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataColorDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailColorApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionColor(
	// 			dataOptionColor?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataBusinessUnitDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailBusinessUnitApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionBusinessUnit(
	// 			dataOptionBusinessUnit?.concat({
	// 				label: detail.name,
	// 				value: detail.id,
	// 			}),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataAreaDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailAreaApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionArea(
	// 			dataOptionArea?.concat({ label: detail.name, value: `${detail.id}` }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataWorkUnitDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailWorkUnitApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionWorkUnit(
	// 			dataOptionWorkUnit?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	// const fetchDataCompanyDetail = async (id: number) => {
	// 	try {
	// 		const response = await getDetailCompanyApi(id);
	// 		const detail = response.data.data;
	// 		setDataOptionCompany(
	// 			dataOptionCompany?.concat({ label: detail.name, value: detail.id }),
	// 		);
	// 	} catch (error: any) {
	// 		CheckResponse(error);
	// 	}
	// };

	const handleInitialValue = (values: IInventoryDetail) => {
		const setData = removeNullFields(values);
		// fetchDataDivisionDetail(setData.id_division);
		// fetchDataCodeGroupDetail(setData.id_main_group);
		// fetchDataSubCodeGroupDetail(setData.id_sub_group);
		// fetchDataCountryDetail(setData.id_country);
		// fetchDataEmployeeDetail(setData.id_penanggung_jawab);
		// fetchDataItemDetail(setData.id_barang);
		// fetchDataConditionDetail(setData.condition);
		// fetchDataLocationDetail(setData.id_location);
		// fetchDataWorkUnitDetail(setData.id_satker);
		// fetchDataAreaDetail(setData.id_area);
		// fetchDataBusinessUnitDetail(setData.id_bisnis_unit);
		// fetchDataCompanyDetail(setData.id_company);
		// fetchDataColorDetail(setData.id_color);
		setInitialValue(setData);
		formRef.current?.setFieldsValue(setData);
	};

	useEffect(() => {
		if (showModal.show && showModal.id) {
			fetchDataDetail(showModal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	const itemTab: TabsProps["items"] = [
		{
			key: "1",
			label: `Informasi Umum`,
			children: (
				<>
					<Form.Item name="id_company">
						<div className="form-group">
							<Title level={5}>
								Perusahaan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									disabled
									options={dataOptionCompany}
									value={formik.values.id_company}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.company || formik.values.id_company || ""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="inventory_type">
						<div className="form-group">
							<Title level={5}>
								Jenis Barang <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Select
									disabled
									options={[
										{ value: 1, label: "Inventaris" },
										{ value: 2, label: "HBB" },
									]}
									value={formik.values.inventory_type}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_main_group">
						<div className="form-group">
							<Title level={5}>
								Main Group <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									disabled
									options={dataOptionCodeGroup}
									value={formik.values.id_main_group}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.main_group ||
										formik.values.id_main_group ||
										""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_sub_group">
						<div className="form-group">
							<Title level={5}>
								Sub Group <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									disabled
									options={dataOptionSubCodeGroup}
									value={formik.values.id_sub_group}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.sub_group || formik.values.id_sub_group || ""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_bisnis_unit">
						<div className="form-group">
							<Title level={5}>
								Bisnis Unit <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									disabled
									options={dataOptionBusinessUnit}
									value={formik.values.id_bisnis_unit}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.bisnis_unit ||
										formik.values.id_bisnis_unit ||
										""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_area">
						<div className="form-group">
							<Title level={5}>
								Area <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									disabled
									options={dataOptionArea}
									value={formik.values.id_area}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.area || formik.values.id_area || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_satker">
						<div className="form-group">
							<Title level={5}>
								Satuan Kerja <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionWorkUnit}
									value={formik.values.id_satker}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.satker || formik.values.id_satker || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_location">
						<div className="form-group">
							<Title level={5}>
								Lokasi <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionLocation}
									value={formik.values.id_location}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.location || formik.values.id_location || ""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_division">
						<div className="form-group">
							<Title level={5}>Divisi</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionDivision}
									value={formik.values.id_division}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.division || formik.values.id_division || ""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_barang">
						<div className="form-group">
							<Title level={5}>
								Nama Barang <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionItem}
									value={formik.values.id_barang}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.name || formik.values.id_barang || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="year">
						<div className="form-group">
							<Title level={5}>
								Tahun Perolehan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<DatePicker
									disabled
									className="form-control"
									picker="year"
									value={
										formik.values.year
											? dayjs(formik.values.year, "YYYY")
											: undefined
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="serial_no">
						<div className="form-group">
							<Title level={5}>
								Nomor Urut <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.serial_no || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="price">
						<div className="form-group">
							<Title level={5}>
								Harga Perolehan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<InputNumber
									disabled
									addonBefore="Rp"
									name="price"
									style={{ width: "100%" }}
									formatter={value =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}
									value={formik.values.price}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="jumlah">
						<div className="form-group">
							<Title level={5}>
								Jumlah <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<InputNumber
									disabled
									min={1}
									style={{ width: "100%" }}
									value={formik.values.jumlah}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_country">
						<div className="form-group">
							<Title level={5}>
								Negara Pembuat <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionCountry}
									value={formik.values.id_country}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.country || formik.values.id_country || ""
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="year_made">
						<div className="form-group">
							<Title level={5}>
								Tahun Pembuatan <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								<DatePicker
									disabled
									className="form-control"
									picker="year"
									value={
										formik.values.year_made
											? dayjs(formik.values.year_made, "YYYY")
											: undefined
									}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="condition">
						<div className="form-group">
							<Title level={5}>
								Kondisi <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionCondition}
									value={formik.values.condition}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.area || formik.values.id_area || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_color">
						<div className="form-group">
							<Title level={5}>
								Warna <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionColor}
									value={formik.values.id_color}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.color || formik.values.id_color || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="id_penanggung_jawab">
						<div className="form-group">
							<Title level={5}>
								Penanggung Jawab <span className="text-danger">*</span>
							</Title>
							<div className="controls">
								{/* <Select
									options={dataOptionEmployee}
									value={formik.values.id_penanggung_jawab}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={
										formik.values.penanggung_jawab ||
										formik.values.id_penanggung_jawab ||
										""
									}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
		{
			key: "2",
			label: `Detail`,
			children: (
				<>
					<Form.Item name="merk">
						<div className="form-group">
							<Title level={5}>Merk</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.merk || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="model">
						<div className="form-group">
							<Title level={5}>Model</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.model || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="jenis">
						<div className="form-group">
							<Title level={5}>Jenis</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.jenis || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="type">
						<div className="form-group">
							<Title level={5}>Tipe</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.type || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="size">
						<div className="form-group">
							<Title level={5}>Ukuran</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.size || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="capacity">
						<div className="form-group">
							<Title level={5}>Kapasitas</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.capacity || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_akuntansi">
						<div className="form-group">
							<Title level={5}>Nomor Akuntansi</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.no_akuntansi || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_bast">
						<div className="form-group">
							<Title level={5}>Nomor BAST/DO</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.no_bast || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="date_bast">
						<div className="form-group">
							<Title level={5}>Tanggal BAST</Title>
							<div className="controls">
								{/* <DatePicker
									disable
									className="form-control"
									format={"YYYY-MM-DD"}
									value={
										formik.values.date_bast
											? dayjs(formik.values.date_bast, "YYYY-MM-DD")
											: undefined
									}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.date_bast || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="serial_number">
						<div className="form-group">
							<Title level={5}>Nomor Seri</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.serial_number || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_polisi">
						<div className="form-group">
							<Title level={5}>Nomor Polisi</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.no_polisi || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_rangka">
						<div className="form-group">
							<Title level={5}>Nomor Rangka</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.no_rangka || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_mesin">
						<div className="form-group">
							<Title level={5}>Nomor Mesin</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.no_mesin || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="no_bpkb">
						<div className="form-group">
							<Title level={5}>Nomor BPKB</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.no_bpkb || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="remark">
						<div className="form-group">
							<Title level={5}>Keterangan</Title>
							<div className="controls">
								<TextArea
									disabled
									rows={3}
									className="form-control"
									value={formik.values.remark || ""}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
		{
			key: "3",
			label: `Kontak`,
			children: (
				<>
					<Form.Item name="distributor">
						<div className="form-group">
							<Title level={5}>Distributor</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.distributor || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="contract_no">
						<div className="form-group">
							<Title level={5}>Nomor Kontak</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.contract_no || ""}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="contract_date">
						<div className="form-group">
							<Title level={5}>Tanggal Kontrak</Title>
							<div className="controls">
								{/* <DatePicker
									className="form-control"
									format={"YYYY-MM-DD"}
									value={
										formik.values.contract_date
											? dayjs(formik.values.contract_date, "YYYY-MM-DD")
											: undefined
									}
								/> */}
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.contract_date || ""}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
	];

	return (
		<AntdModal
			title={<Title level={3}>Detail Data</Title>}
			footer={
				<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
					<Button
						shape="round"
						size="large"
						onClick={() => setShowModal({ show: false })}
					>
						Close
					</Button>
				</div>
			}
			onCancel={() => setShowModal({ show: false })}
			open={showModal.show}
			width={800}
			destroyOnClose
		>
			<Form form={form} ref={formRef}>
				<Divider />
				<Tabs defaultActiveKey="1" items={itemTab} />
			</Form>
		</AntdModal>
	);
};

export default ModalDetail;
