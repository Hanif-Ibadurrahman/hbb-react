import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import {
	Modal as AntdModal,
	Button,
	Divider,
	Form,
	FormInstance,
	Input,
	Select,
	Typography,
} from "antd";
import { useFormik } from "formik";
import { NonNullableInterface, removeNullFields } from "app/helper/common";
import { IServiceReplacement } from "store/types/serviceReplacementTypes";
import { CheckResponse, TokenDekode } from "app/helper/authentication";
import { DefaultOptionType } from "antd/es/select";
import Swal from "sweetalert2";
import { getDetailServiceReplacementApi } from "api/serviceReplacement";
import { getAllLocationApi } from "api/location";
import { getAllWorkUnitApi } from "api/workUnit";
import { approveServiceReturnApi } from "api/serviceReturn";
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
	const tokenDecode = TokenDekode();
	const { Title } = Typography;
	const [modalForm] = Form.useForm();
	const modalFormRef = useRef<FormInstance>(null);
	const [dataDetail, setDataDetail] = useState<IServiceReplacement>();
	const [initialValue, setInitialValue] =
		useState<NonNullableInterface<IServiceReplacement>>();
	const [dataOptionAvailableInventory, setDataOptionAvailableInventory] =
		useState<DefaultOptionType[] | undefined>();
	const [dataOptionFinalWorkUnit, setDataOptionFinalWorkUnit] = useState<
		DefaultOptionType[] | undefined
	>();
	const [dataOptionFinalLocation, setDataOptionFinalLocation] = useState<
		DefaultOptionType[] | undefined
	>();

	const formikModalForm = useFormik({
		initialValues: { ...initialValue, id_final_satker: undefined, remark: "" },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const fetchDataDetail = async (id: number) => {
		try {
			const response = await getDetailServiceReplacementApi(id);
			const detail = response.data.data;

			setDataDetail(detail);
			setDataOptionAvailableInventory(
				dataOptionAvailableInventory?.concat({
					label: `${detail.inventory_name} - ${detail.inventory_code}`,
					value: detail.id_inventory,
				}),
			);

			const input = {
				...detail,
				id_inventory_obtained: detail.id_inventory,
			};

			setInitialValue(input);
			modalFormRef.current?.setFieldsValue(input);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataFinalWorkUnit = async () => {
		try {
			const response = await getAllWorkUnitApi({
				id_company: tokenDecode?.user?.id_company || undefined,
				id_area: tokenDecode?.user?.id_area || undefined,
			});
			const workUnitList = response.data.data;
			setDataOptionFinalWorkUnit(
				workUnitList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const fetchDataFinalLocation = async () => {
		try {
			const response = await getAllLocationApi({
				id_company: tokenDecode?.user?.id_company || undefined,
				id_area: tokenDecode?.user?.id_area || undefined,
				id_satker: formikModalForm.values.id_final_satker,
			});
			const locationList = response.data.data;
			setDataOptionFinalLocation(
				locationList.map(v => ({ label: v.name, value: v.id })),
			);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	useEffect(() => {
		fetchDataFinalWorkUnit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchDataFinalLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formikModalForm.values.id_final_satker]);

	useEffect(() => {
		if (dataForm) {
			const setData = removeNullFields(dataForm);
			fetchDataDetail(setData.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataForm]);

	const onFinish = (values: any) => {
		const input = {
			...values,
			id_final_satker: values?.id_final_satker,
			id_final_location:
				values?.id_final_location === dataDetail?.id_final_location
					? null
					: values?.id_final_location,
		};
		approveServiceReturnApi(dataForm.id, input)
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
					<Button
						shape="round"
						size="large"
						type="primary"
						onClick={modalForm.submit}
					>
						Approve
					</Button>
				</div>
			}
			onCancel={() => setShowModal(false)}
			open={showModal}
			width={800}
			destroyOnClose
		>
			<Form form={modalForm} ref={modalFormRef} onFinish={onFinish}>
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
						<Title level={5}>No. HBB/Inventaris</Title>
						<div className="controls">
							<Input
								disabled
								type="text"
								className="form-control"
								value={`${formikModalForm.values.inventory_name} - ${formikModalForm.values.inventory_code}`}
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
				<Form.Item name="id_final_satker">
					<div className="form-group">
						<Title level={5}>Satuan Kerja Akhir</Title>
						<div className="controls">
							<Select
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={dataOptionFinalWorkUnit}
								onChange={(v, opt) => {
									formikModalForm.setFieldValue("id_final_satker", v);
									modalFormRef.current?.setFieldsValue({
										id_final_satker: v,
									});
								}}
								value={formikModalForm.values.id_final_satker}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="id_final_location">
					<div className="form-group">
						<Title level={5}>Lokasi Akhir</Title>
						<div className="controls">
							<Select
								filterOption={(input, option) =>
									(`${option?.label}` ?? "")
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={dataOptionFinalLocation}
								onChange={(v, opt) => {
									formikModalForm.setFieldValue("id_final_location", v);
									modalFormRef.current?.setFieldsValue({
										id_final_location: v,
									});
								}}
								value={formikModalForm.values.id_final_location}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item name="remark">
					<div className="form-group">
						<Title level={5}>Catatan</Title>
						<div className="controls">
							<Input
								type="text"
								name="remark"
								className="form-control"
								placeholder="Catatan"
								onChange={formikModalForm.handleChange}
								value={formikModalForm.values.remark}
							/>
						</div>
					</div>
				</Form.Item>
			</Form>
		</AntdModal>
	);
};

export default ModalForm;
