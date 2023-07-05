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
import { changeDateFormat } from "app/helper/dateHelper";
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

	const generateContent = useMemo(() => {
		if (isSuperadminGlobal) {
			return (
				<Col span={24}>
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

	const handleSubmit = v => {
		const values = {
			...v,
			tanggal_awal: changeDateFormat(v["tanggal_awal"]),
			tanggal_akhir: changeDateFormat(v["tanggal_akhir"]),
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
			<Form
				form={formFilter}
				ref={formFilterRef}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={16}>
					{generateContent}
					<Col span={24}>
						<Form.Item name="inventory_type" label="Jenis Barang">
							<Select
								options={[
									{ value: 1, label: "Inventaris" },
									{ value: 2, label: "HBB" },
								]}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="tanggal_awal" label="Tanggal Awal">
							<DatePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="tanggal_akhir" label="Tanggal Akhir">
							<DatePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
