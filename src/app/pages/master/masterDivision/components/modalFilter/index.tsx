import { Button, Col, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { Dispatch, SetStateAction } from "react";
import { IDivisionGetAllParams } from "store/types/divisionTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IDivisionGetAllParams | undefined>>;
}

export const ModalFilter = ({
	isShow,
	setShowModal,
	setParams,
}: IModalFilter) => {
	const [formFilter] = Form.useForm();

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
					<Col span={24}>
						<Form.Item name="name" label="Nama Divisi">
							<SelectWithTag colorTag="cyan" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="satker" label="Nama Satuan Kerja">
							<SelectWithTag colorTag="cyan" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="kepala_satker" label="Nama Kepala Satuan Kerja">
							<SelectWithTag colorTag="cyan" />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
