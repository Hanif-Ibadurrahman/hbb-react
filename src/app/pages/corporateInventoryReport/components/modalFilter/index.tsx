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
import { isSuperadminGlobal } from "app/helper/permission";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { ICorporateInventoryReportGetAllParams } from "store/types/corporateInventoryReportTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<
		SetStateAction<ICorporateInventoryReportGetAllParams | undefined>
	>;
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
	const formFilterRef = useRef<FormInstance>(null);
	const { RangePicker } = DatePicker;

	const generateContent = useMemo(() => {
		if (isSuperadminGlobal) {
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
	}, [options.dataOptionCompany]);

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
									{ value: "pdf", label: "Pdf" },
								]}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
