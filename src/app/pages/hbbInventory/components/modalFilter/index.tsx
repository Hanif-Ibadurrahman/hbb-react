import { Button, Col, DatePicker, Drawer, Form, Row, Space } from "antd";
import { SelectWithTag } from "app/components/selectWithTag";
import { isSuperadminGlobal } from "app/helper/permission";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IInventoryGetAllParams } from "store/types/inventoryTypes";
interface IModalFilter {
	isShow: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setParams: Dispatch<SetStateAction<IInventoryGetAllParams | undefined>>;
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
	const { RangePicker } = DatePicker;

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

	const checkRangeValue = value => {
		return value
			? `${value[0].format("YYYY-MM-DD")}|${value[1].format("YYYY-MM-DD")}`
			: undefined;
	};

	const handleSubmit = v => {
		const values = {
			...v,
			rentang_waktu: checkRangeValue(v["rentang_waktu"]),
			rentang_tahun_perolehan: checkRangeValue(v["rentang_tahun_perolehan"]),
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
		setParams({
			...filterParams,
			rentang_waktu: values.rentang_waktu,
			rentang_tahun_perolehan: values.rentang_tahun_perolehan,
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
			<Form form={formFilter} layout="vertical" onFinish={handleSubmit}>
				<Row gutter={16}>
					{generateContent}
					<Col span={12}>
						<Form.Item name="inventory_type" label="Jenis Barang">
							<SelectWithTag
								dataOption={[
									{ value: 1, label: "Inventaris" },
									{ value: 2, label: "HBB" },
								]}
								mode="multiple"
							/>
						</Form.Item>
					</Col>
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
						<Form.Item name="year" label="Tahun Perolehan">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="name" label="Nama Barang">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="distributor" label="Distributor">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="no_akuntansi" label="No Akuntansi">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="no_bast" label="No BAST/DO">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="country" label="Negara Pembuat">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="year_made" label="Tahun Pembuatan">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="merk" label="Merk">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="model" label="Model">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="color" label="Warna">
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
						<Form.Item name="capacity" label="Kapasitas">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="size" label="Ukuran">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="serial_number" label="No Seri">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="no_polisi" label="No Polisi">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="no_rangka" label="No Rangka">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="no_mesin" label="No Mesin">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="no_bpkb" label="No BPKB">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="contract_no" label="No Kontrak">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="contract_date" label="Tanggal Kontrak">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
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
								dataOption={options.dataOptionBusinessUnit}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="area" label="Area">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setAreaParams({ name: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionArea}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="satker" label="Satuan Kerja">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setWorkUnitParams({ satker: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionWorkUnit}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="location" label="Lokasi">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setLocationParams({ lokasi: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionLocation}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="penanggung_jawab" label="Penanggung Jawab">
							<SelectWithTag />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="condition" label="Kondisi">
							<SelectWithTag
								showSearch
								onSearch={v => setParamsOption.setConditionParams({ name: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={options.dataOptionCondition}
								valueOption="label"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="rentang_waktu" label="Rentang Waktu">
							<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="rentang_tahun_perolehan"
							label="Rentang Waktu Perolehan"
						>
							<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="code" label="No HBB">
							<SelectWithTag />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};
