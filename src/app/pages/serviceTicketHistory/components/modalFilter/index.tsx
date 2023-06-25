import {
	Button,
	Col,
	DatePicker,
	Drawer,
	Form,
	Row,
	Space,
	Select,
} from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { isSuperadminGlobal } from "app/helper/permission";
import { FormikProps } from "formik";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IServiceTicketHistoryGetAllParams } from "store/types/serviceTicketHistoryTypes";
interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<
		SetStateAction<IServiceTicketHistoryGetAllParams | undefined>
	>;
	formik: FormikProps<Partial<IServiceTicketHistoryGetAllParams>>;
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
	const { RangePicker } = DatePicker;

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

	const checkRangeValue = value => {
		return value
			? `${value[0].format("YYYY-MM-DD")}|${value[1].format("YYYY-MM-DD")}`
			: undefined;
	};

	const handleSubmit = v => {
		const values = {
			...v,
			date: checkRangeValue(v["date"]),
		};
		const filterParams = Object.entries(values).reduce((res, curr) => {
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
						<Form.Item name="type" label="Tipe">
							<SelectWithTag
								dataOption={[
									{ label: "Permintaan", value: "permintaan" },
									{ label: "Perubahan", value: "perubahan" },
									{ label: "Penggantian", value: "penggantian" },
									{ label: "Pemeriksaan", value: "pemeriksaan" },
									{ label: "Perbaikan", value: "perbaikan" },
									{ label: "Pengembalian", value: "pengembalian" },
									{ label: "Penghapusan", value: "penghapusan" },
								]}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="date" label="Tanggal">
							<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={24}>
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
					<Col span={24}>
						<Form.Item name="requester" label="Requester">
							<SelectWithTag />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
