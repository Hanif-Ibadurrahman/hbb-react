import { Button, Col, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { Dispatch, SetStateAction } from "react";
import { IServiceRequestGetAllParams } from "store/types/serviceRequestTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IServiceRequestGetAllParams | undefined>>;
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
						<Form.Item name="inventory_code" label="No HBB/Inventaris">
							<SelectWithTag />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item
							name="inventory_description"
							label="Deskripsi HBB/Inventaris"
						>
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="nama_pemakai" label="Nama Pemakai Akhir">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="condition" label="Kondisi">
							<SelectWithTag />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
