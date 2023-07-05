import {
	Button,
	Col,
	DatePicker,
	Drawer,
	Form,
	Row,
	Select,
	Slider,
	Space,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { getAllAreaApi } from "api/area";
import { getAllBusinessUnitApi } from "api/businessUnit";
import { getAllLocationApi } from "api/location";
import { getAllWorkUnitApi } from "api/workUnit";
import { SelectWithTag } from "app/components/selectWithTag";
import { CheckResponse } from "app/helper/authentication";
import { isSuperadminGlobal } from "app/helper/permission";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { IInventoryGetAllParams } from "store/types/inventoryTypes";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";
interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IInventoryGetAllParams | undefined>>;
	setParamsOption: any;
	options: any;
}

export const ModalFilter = ({
	isShow,
	setShowModal,
	setParams,
	setParamsOption,
	options,
}: IModalFilter) => {
	const [formFilter] = Form.useForm();
	const { RangePicker } = DatePicker;

	const [initialValue, _] = useState<Partial<any>>();
	const [businessUnitParams, setBusinessUnitParams] = useState<
		IBusinessUnitGetAllParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
	const [workUnitParams, setWorkUnitParams] = useState<
		IWorkUnitGetAllParams | undefined
	>();
	const [locationParams, setLocationParams] = useState<
		ILocationGetAllParams | undefined
	>();
	const [dataOptionBusinessUnit, setDataOptionBusinessUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionArea, setDataOptionArea] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionWorkUnit, setDataOptionWorkUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionLocation, setDataOptionLocation] = useState<
		DefaultOptionType[] | undefined
	>();

	const generateContent = useMemo(() => {
		if (isSuperadminGlobal) {
			return (
				<Col span={24}>
					<Form.Item name="company" label="Perusahaan">
						<SelectWithTag
							showSearch
							onSearch={v => setParamsOption.setCompanyParams({ name: v })}
							filterOption={(input, option) =>
								(`${option?.label}` ?? "")
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							dataOption={options.dataOptionCompany}
							valueOption="label"
						/>
					</Form.Item>
				</Col>
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.dataOptionCompany]);

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataBusinessUnit = async () => {
		try {
			const response = await getAllBusinessUnitApi({
				...businessUnitParams,
				id_company: formik.values.id_company,
			});
			const businessUnitList = response.data.data;
			setDataOptionBusinessUnit(
				businessUnitList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataArea = async () => {
		try {
			const response = await getAllAreaApi({
				...areaParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
			});
			const areaList = response.data.data;
			setDataOptionArea(
				areaList.map(v => ({ label: v.name, value: `${v.id}` })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataWorkUnit = async () => {
		try {
			const response = await getAllWorkUnitApi({
				...workUnitParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
				id_area: formik.values.id_area,
			});
			const workUnitList = response.data.data;
			setDataOptionWorkUnit(
				workUnitList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataLocation = async () => {
		try {
			const response = await getAllLocationApi({
				...locationParams,
				id_company: formik.values.id_company,
				id_bisnis_unit: formik.values.id_bisnis_unit,
				id_area: formik.values.id_area,
				id_satker: formik.values.id_satker,
			});
			const locationList = response.data.data;
			setDataOptionLocation(
				locationList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const checkRangeDate = value => {
		return value
			? `${value[0].format("YYYY-MM-DD")}|${value[1].format("YYYY-MM-DD")}`
			: undefined;
	};

	const checkRangePrice = value => {
		return value ? `${value[0]}|${value[1]}` : undefined;
	};

	const handleSubmit = v => {
		const values = {
			...v,
			rentang_harga: checkRangePrice(v["rentang_harga"]),
			rentang_waktu: checkRangeDate(v["rentang_waktu"]),
			rentang_tahun_perolehan: checkRangeDate(v["rentang_tahun_perolehan"]),
		};
		const filterParams: any = Object.entries(values).reduce((res, curr) => {
			if (curr[1]) {
				return {
					...res,
					[curr[0]]: curr[1]?.toString(),
				};
			} else {
				return res;
			}
		}, {});
		setParams({
			...filterParams,
			rentang_waktu: values.rentang_waktu,
			rentang_tahun_perolehan: values.rentang_tahun_perolehan,
		});
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	useEffect(() => {
		fetchDataBusinessUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessUnitParams]);

	useEffect(() => {
		fetchDataArea();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaParams]);

	useEffect(() => {
		fetchDataWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workUnitParams]);

	useEffect(() => {
		fetchDataLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationParams]);

	useEffect(() => {
		const companyId = formik.values.id_company;
		if (companyId) {
			const isUndefinedCompanyId = initialValue?.id_company === undefined;
			if (isUndefinedCompanyId || companyId !== initialValue.id_company) {
				formik.setFieldValue("id_main_group", undefined);
				formik.setFieldValue("id_bisnis_unit", undefined);
			}
			fetchDataBusinessUnit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_company]);

	useEffect(() => {
		const businessUnitId = formik.values.id_bisnis_unit;
		if (businessUnitId) {
			const isInitialValueUndefined =
				initialValue?.id_bisnis_unit === undefined;
			if (
				isInitialValueUndefined ||
				businessUnitId !== initialValue.id_bisnis_unit
			) {
				formik.setFieldValue("id_area", undefined);
			}
			fetchDataArea();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_bisnis_unit]);

	useEffect(() => {
		const areaId = formik.values.id_area;

		if (areaId) {
			const isInitialValueUndefined = initialValue?.id_area === undefined;
			if (isInitialValueUndefined || areaId !== initialValue.id_area) {
				formik.setFieldValue("id_location", undefined);
				formik.setFieldValue("id_satker", undefined);
			}
			fetchDataWorkUnit();
			fetchDataLocation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_area]);

	useEffect(() => {
		const workUnitId = formik.values.id_satker;
		if (workUnitId) {
			const isInitialValueUndefined = initialValue?.id_satker === undefined;
			if (isInitialValueUndefined || workUnitId !== initialValue.id_satker) {
				formik.setFieldValue("id_location", undefined);
				formik.setFieldValue("id_division", undefined);
			}
			fetchDataLocation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_satker]);

	return (
		<Drawer
			title="Filter"
			size="default"
			onClose={handleCancel}
			open={isShow}
			bodyStyle={{ paddingBottom: 80 }}
			extra={
				<Space>
					<Button onClick={handleCancel}>Cancel</Button>
					<Button onClick={() => formFilter.resetFields()} danger>
						Reset
					</Button>
					<Button onClick={() => formFilter.submit()} type="primary">
						Filter
					</Button>
				</Space>
			}
		>
			<Form form={formFilter} layout="vertical" onFinish={handleSubmit}>
				<Row gutter={16}>
					{generateContent}
					<Col span={24}>
						<Form.Item name="inventory_type" label="Jenis Barang">
							<SelectWithTag
								dataOption={[
									{ value: 1, label: "Inventaris" },
									{ value: 2, label: "HBB" },
								]}
								mode="multiple"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="main_group" label="Main Group">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setCodeGroupParams({ group: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionCodeGroup}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="sub_group" label="Sub Group">
							<SelectWithTag
								showSearch
								onSearch={v =>
									setParamsOption.setSubCodeGroupParams({ group: v })
								}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionSubCodeGroup}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="year" label="Tahun Perolehan">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="name" label="Nama Barang">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="distributor" label="Distributor">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="no_akuntansi" label="No Akuntansi">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="no_bast" label="No BAST/DO">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="country" label="Negara Pembuat">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="year_made" label="Tahun Pembuatan">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="merk" label="Merk">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="model" label="Model">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="color" label="Warna">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setColorParams({ color: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionColor}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="capacity" label="Kapasitas">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="size" label="Ukuran">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="serial_number" label="No Seri">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="no_polisi" label="No Polisi">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="no_rangka" label="No Rangka">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="no_mesin" label="No Mesin">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="no_bpkb" label="No BPKB">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="contract_no" label="No Kontrak">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="contract_date" label="Tanggal Kontrak">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="id_bisnis_unit" label="Bisnis Unit">
							<Select
								showSearch
								onSearch={v => setBusinessUnitParams({ name: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={dataOptionBusinessUnit}
								onChange={(v, opt) => {
									formik.setFieldValue("id_bisnis_unit", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="id_area" label="Area">
							<Select
								showSearch
								onSearch={v => setAreaParams({ name: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={dataOptionArea}
								onChange={(v, opt) => {
									formik.setFieldValue("id_area", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="id_satker" label="Satuan Kerja">
							<Select
								showSearch
								onSearch={v => setWorkUnitParams({ satker: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={dataOptionWorkUnit}
								onChange={(v, opt) => {
									formik.setFieldValue("id_satker", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="id_location" label="Lokasi">
							<Select
								showSearch
								onSearch={v => setLocationParams({ lokasi: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={dataOptionLocation}
								onChange={(v, opt) => {
									formik.setFieldValue("id_location", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="penanggung_jawab" label="Penanggung Jawab">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="condition" label="Kondisi">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setConditionParams({ name: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionCondition}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="rentang_harga" label="Rentang Harga">
							<Slider
								range={{ draggableTrack: true }}
								min={0}
								max={1000000000}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="rentang_waktu" label="Rentang Waktu">
							<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							name="rentang_tahun_perolehan"
							label="Rentang Waktu Perolehan"
						>
							<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="code" label="No HBB">
							<SelectWithTag />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
