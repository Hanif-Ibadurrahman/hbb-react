import { Button, Col, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { isSuperadminGlobal } from "app/helper/permission";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IItemGetAllParams } from "store/types/itemTypes";

interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IItemGetAllParams | undefined>>;
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
				<Col span={12}>
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
						<Form.Item name="main_group" label="Main Group">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setCodeGroupParams({ group: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionCodeGroup}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="sub_group" label="Sub Group">
							<SelectWithTag
								showSearch
								onSearch={v =>
									setParamsOption.setSubCodeGroupParams({ group: v })
								}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionSubCodeGroup}
								valueOption="label"
							/>
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
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setColorParams({ color: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionColor}
								valueOption="label"
							/>
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
					<Col span={12}>
						<Form.Item name="satuan" label="Satuan">
							<SelectWithTag />
						</Form.Item>
					</Col>
					{generateContent}
				</Row>
			</Form>
		</Drawer>
	);
};
