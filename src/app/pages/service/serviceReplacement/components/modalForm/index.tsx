import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Typography,
} from "antd";
import { useFormik } from "formik";
import { NonNullableInterface, removeNullFields } from "app/helper/common";
import { IServiceReplacement } from "store/types/serviceReplacementTypes";
import { SelectWithTag } from "app/components/selectWithTag";
import { IInventoryInWarehouseParams } from "store/types/inventoryTypes";
import { getAllInventoryInWarehouseApi } from "api/inventory";
import { CheckResponse } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import Swal from "sweetalert2";
import { updateFormApprovalApi } from "api/serviceReplacement";

interface IModalForm {
	dataForm: any;
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	updateDataList: () => void;
}

const ModalForm = ({
	dataForm,
	showModal,
	setShowModal,
	updateDataList,
}: IModalForm) => {
	const { Title } = Typography;
	const [modalform] = Form.useForm();
	const modalFormRef = useRef<FormInstance>(null);
	const [initialValue, setInitialValue] =
		useState<NonNullableInterface<IServiceReplacement>>();
	const [availableInventoryParams, setAvailableInventoryParams] = useState<
		IInventoryInWarehouseParams | undefined
	>();
	const [dataOptionAvailableInventory, setDataOptionAvailableInventory] =
		useState<DefaultOptionType[] | undefined>();

	const formikModalForm = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataAvailableInventory = async () => {
		try {
			const response = await getAllInventoryInWarehouseApi(
				availableInventoryParams,
			);
			const inventoryList = response.data.data.data;
			setDataOptionAvailableInventory(
				inventoryList.map(v => ({
					label: `${v.name} - ${v.code}`,
					value: v.id,
				})),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	useEffect(() => {
		fetchDataAvailableInventory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [availableInventoryParams]);

	useEffect(() => {
		const inventory = formikModalForm.values.id_inventory_obtained;
		if (!inventory) {
			formikModalForm.setFieldValue("id_inventory_obtained", undefined);
			modalFormRef.current?.setFieldsValue({
				id_inventory_obtained: undefined,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formikModalForm.values.id_inventory_obtained]);

	useEffect(() => {
		if (dataForm) {
			const setData = removeNullFields(dataForm);
			setInitialValue(setData);
			modalFormRef.current?.setFieldsValue(setData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataForm]);

	const onFinish = (values: any) => {
		const input = {
			id_inventory_obtained: values.id_inventory_obtained ?? null,
		};
		updateFormApprovalApi(dataForm.id, input)
			.then(res => {
				if (res.data.status === "success") {
					setShowModal(false);
					Swal.fire({
						icon: res.data.status,
						title: res.data.message,
						showConfirmButton: false,
						timer: 3000,
					});
					updateDataList();
				}
			})
			.catch((error: any) => {
				CheckResponse(error);
			});
	};

	return (
		<AntdModal
			title={<Title level={3}>Detail Data</Title>}
			footer={
				<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
					<Button
						shape="round"
						size="large"
						onClick={() => setShowModal(false)}
					>
						Close
					</Button>
					<Button type="primary" onClick={modalform.submit}>
						Approve
					</Button>
				</div>
			}
			onCancel={() => setShowModal(false)}
			open={showModal}
			width={800}
			destroyOnClose
		>
			<Form form={modalform} ref={modalFormRef} onFinish={onFinish}>
				<Divider />
				<Form.Item name="no_urut">
					<div className="form-group">
						<Title level={5}>No. Transaksi</Title>
						<div className="controls">
							<Input
								disabled
								type="text"
								className="form-control"
								value={formikModalForm.values.no_urut}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="inventory_code">
					<div className="form-group">
						<Title level={5}>No. HBB/Inventaris yang diminta</Title>
						<div className="controls">
							<Input
								disabled
								type="text"
								className="form-control"
								value={formikModalForm.values.inventory_code}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="id_inventory_obtained">
					<div className="form-group">
						<Title level={5}>
							HBB/Inventaris pengganti
							<span className="text-danger">*</span>
						</Title>
						<div className="controls">
							<SelectWithTag
								showSearch
								onSearch={v => setAvailableInventoryParams({ search: v })}
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								dataOption={dataOptionAvailableInventory}
								onChange={(v, opt) => {
									formikModalForm.setFieldValue(
										"id_inventory_obtained",
										v.slice(0, 1),
									);
									modalFormRef.current?.setFieldsValue({
										id_inventory_obtained: v.slice(0, 1),
									});
								}}
								value={formikModalForm.values.id_inventory_obtained}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="description">
					<div className="form-group">
						<Title level={5}>Deskripsi HBB/Inventaris</Title>
						<div className="controls">
							<Input
								disabled
								type="text"
								className="form-control"
								value={formikModalForm.values.description}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="emp_name">
					<div className="form-group">
						<Title level={5}>Nama Pemakai Akhir</Title>
						<div className="controls">
							<Input
								disabled
								type="text"
								className="form-control"
								value={formikModalForm.values.emp_name}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="condition">
					<div className="form-group">
						<Title level={5}>Kondisi</Title>
						<div className="controls">
							<Input
								disabled
								type="text"
								className="form-control"
								value={formikModalForm.values.condition}
							/>
						</div>
					</div>
				</Form.Item>
			</Form>
		</AntdModal>
	);
};

export default ModalForm;
