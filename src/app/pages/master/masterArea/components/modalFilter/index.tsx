import { Button, Col, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { isSuperadminGlobal } from "app/helper/permission";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IAreaGetAllParams } from "store/types/areaTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IAreaGetAllParams | undefined>>;
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
					{generateContent}
					<Col span={24}>
						<Form.Item name="bisnis_unit" label="Bisnis Unit">
							<SelectWithTag
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
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="name" label="Nama Area">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="daerah" label="Daerah">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="pemegang" label="Pemegang">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="pengelola" label="Pengelola">
							<SelectWithTag />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
