import { Button, Col, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { TokenDekode } from "app/helper/authentication";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IItemGetAllParams } from "store/types/itemTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IItemGetAllParams | undefined>>;
}

export const ModalFilter = ({
	isShow,
	setShowModal,
	setParams,
}: IModalFilter) => {
	const [formFilter] = Form.useForm();
	const tokenDecode = TokenDekode();

	const generateContent = useMemo(() => {
		const isSuperadmin = Object.values(tokenDecode.user?.roles ?? {}).includes(
			"Super Admin",
		);
		if (isSuperadmin) {
			return (
				<Col span={12}>
					<Form.Item name="company" label="Perusahaan">
						<SelectWithTag />
					</Form.Item>
				</Col>
			);
		}
	}, [tokenDecode]);

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
			<Form form={formFilter} layout="vertical" onFinish={handleSubmit}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name="id_main_group" label="Main Group">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="id_sub_group" label="Sub Group">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="name" label="Nama Barang">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="merk" label="Merk">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="tipe" label="Tipe">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="jenis" label="Jenis">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="model" label="Model">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="warna" label="Warna">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="kapasitas" label="Kapasital">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="ukuran" label="Ukuran">
							<SelectWithTag />
						</Form.Item>
					</Col>
					{generateContent}
				</Row>
			</Form>
		</Drawer>
	);
};
