import { Button, Col, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { TokenDekode } from "app/helper/authentication";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IEmployeeGetAllParams } from "store/types/employeeTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IEmployeeGetAllParams | undefined>>;
}

export const ModalFilter = ({
	isShow,
	setShowModal,
	setParams,
}: IModalFilter) => {
	const [formFilter] = Form.useForm();
	const tokenDecode = TokenDekode();

	const generateContent = useMemo(() => {
		const isSuperadmin = Object.values(tokenDecode?.user?.roles ?? {}).includes(
			"Super Admin",
		);
		if (isSuperadmin) {
			return (
				<Col span={24}>
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
						<Form.Item name="emp_name" label="Nama Pegawai">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="nipg" label="NIPG">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="position" label="Jabatan">
							<SelectWithTag />
						</Form.Item>
					</Col>
					{generateContent}
				</Row>
			</Form>
		</Drawer>
	);
};
