import { Button, Col, Drawer, Form, Row, Space, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { getAllAreaApi } from "api/area";
import { getAllBusinessUnitApi } from "api/businessUnit";
import { getAllWorkUnitApi } from "api/workUnit";
import { SelectWithTag } from "app/components/selectWithTag";
import { CheckResponse } from "app/helper/authentication";
import { isSuperadminGlobal } from "app/helper/permission";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IAreaGetAllParams } from "store/types/areaTypes";
import { IBusinessUnitGetAllParams } from "store/types/businessUnitTypes";
import { ILocationGetAllParams } from "store/types/locationTypes";
import { IWorkUnitGetAllParams } from "store/types/workUnitTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<ILocationGetAllParams | undefined>>;
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

	const [initialValue, _] = useState<Partial<any>>();
	const [businessUnitParams, setBusinessUnitParams] = useState<
		IBusinessUnitGetAllParams | undefined
	>();
	const [areaParams, setAreaParams] = useState<IAreaGetAllParams | undefined>();
	const [workUnitParams, setWorkUnitParams] = useState<
		IWorkUnitGetAllParams | undefined
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

	const handleSubmit = v => {
		const filterParams = Object.entries(v).reduce((res, curr) => {
			if (curr[1]) {
				return {
					...res,
					[curr[0]]: curr[1]?.toString(),
				};
			} else {
				return res;
			}
		}, {});
		setParams(filterParams);
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.id_area]);

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
						<Form.Item name="lokasi" label="Lokasi">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="pegawai" label="Penanggung Jawab">
							<SelectWithTag />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
