import {
	Button,
	Col,
	DatePicker,
	Drawer,
	Form,
	FormInstance,
	Row,
	Select,
	Space,
} from "antd";
import { TokenDekode } from "app/helper/authentication";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { IInventoryReportGetAllParams } from "store/types/inventoryReportTypes";
interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IInventoryReportGetAllParams | undefined>>;
	formik: any;
	setParamsOption: any;
	options: any;
}

export const ModalFilter = ({
	isShow,
	setShowModal,
	setParams,
	formik,
	setParamsOption,
	options,
}: IModalFilter) => {
	const [formFilter] = Form.useForm();
	const formFilterRef = useRef<FormInstance>(null);
	const tokenDecode = TokenDekode();
	const { RangePicker } = DatePicker;

	const generateContent = useMemo(() => {
		const isSuperadmin = Object.values(tokenDecode?.user?.roles ?? {}).includes(
			"Super Admin",
		);
		if (isSuperadmin) {
			return (
				<Col span={12}>
					<Form.Item name="id_company" label="Perusahaan">
						<Select
							showSearch
							onSearch={v => setParamsOption.setCompanyParams({ name: v })}
							filterOption={(input, option) =>
								(`${option?.label}` ?? "")
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={options.dataOptionCompany}
						/>
					</Form.Item>
				</Col>
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.dataOptionCompany, tokenDecode?.user?.roles]);

	const checkRangeValue = value => {
		return value
			? {
					tanggal_awal: value[0].format("YYYY-MM-DD"),
					tanggal_akhir: value[1].format("YYYY-MM-DD"),
			  }
			: undefined;
	};

	const handleSubmit = v => {
		const values = {
			...v,
			...checkRangeValue(v["rentang_waktu"]),
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
		delete filterParams.rentang_waktu;

		setParams({
			...filterParams,
		});
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	return (
		<Drawer
			title="Filter"
			size="large"
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
			<Form
				form={formFilter}
				ref={formFilterRef}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name="inventory_type" label="Jenis Barang">
							<Select
								options={[
									{ value: 1, label: "Inventaris" },
									{ value: 2, label: "HBB" },
								]}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_bisnis_unit" label="Bisnis Unit">
							<Select
								showSearch
								onSearch={v =>
									setParamsOption.setBusinessUnitParams({ name: v })
								}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={options.dataOptionBusinessUnit}
								onChange={(v, opt) => {
									formik.setFieldValue("id_bisnis_unit", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_area" label="Area">
							<Select
								showSearch
								onSearch={v => setParamsOption.setAreaParams({ name: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={options.dataOptionArea}
								onChange={(v, opt) => {
									formik.setFieldValue("id_area", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_satker" label="Satuan Kerja">
							<Select
								showSearch
								onSearch={v => setParamsOption.setWorkUnitParams({ satker: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={options.dataOptionWorkUnit}
								onChange={(v, opt) => {
									formik.setFieldValue("id_satker", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_location" label="Lokasi">
							<Select
								showSearch
								onSearch={v => setParamsOption.setLocationParams({ lokasi: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={options.dataOptionLocation}
								onChange={(v, opt) => {
									formik.setFieldValue("id_location", v);
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_main_group" label="Main Group">
							<Select
								showSearch
								onSearch={v => setParamsOption.setCodeGroupParams({ group: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={options.dataOptionCodeGroup}
								onChange={(v, opt) => {
									formik.setFieldValue("id_main_group", v);
									formFilterRef.current?.setFieldsValue({
										id_sub_group: undefined,
									});
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_sub_group" label="Sub Group">
							<Select
								showSearch
								onSearch={v =>
									setParamsOption.setSubCodeGroupParams({ group: v })
								}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={options.dataOptionSubCodeGroup}
								onChange={(v, opt) => {
									formik.setFieldValue("id_sub_group", v);
								}}
								value={formik.values.id_sub_group}
							/>
						</Form.Item>
					</Col>
					{generateContent}
					<Col span={12}>
						<Form.Item name="rentang_waktu" label="Tanggal">
							<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="type_export" label="Export">
							<Select
								options={[
									{ value: undefined, label: "" },
									{ value: "excel", label: "Excel" },
								]}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
