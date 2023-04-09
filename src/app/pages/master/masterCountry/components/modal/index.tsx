import { Button, Form, FormInstance, Input, Modal as AntdModal } from "antd";
import { createNewCountryApi } from "api/country";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { ICreateCountryRequest } from "store/types/countryTypes";
import Swal from "sweetalert2";

interface IModal {
	initialValue?: any;
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
	isShowModal: {
		show: boolean;
		id?: string | undefined;
	};
}

export const Modal = ({ initialValue, setShowModal, isShowModal }: IModal) => {
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance>(null);
	const [isShow, setIsShow] = useState<boolean>(isShowModal.show);

	const formik = useFormik({
		initialValues: { name: initialValue?.name },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	const handleCancel = () => {
		setShowModal({ show: false });
		setIsShow(false);
	};

	const onFinish = async (values: ICreateCountryRequest) => {
		try {
			// await dispatch(createNewCountryAction(values));
			const response = await createNewCountryApi(values);

			Swal.fire({
				icon: response.data.status,
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Opps... Telah terjadi kesalahan",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<AntdModal
			title={isShowModal.show && isShowModal.id ? "Edit Data" : "Tambah Datas"}
			footer={
				<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
					<Button type="primary" danger onClick={handleCancel}>
						Close
					</Button>
					<Button type="primary" onClick={form.submit}>
						Simpan
					</Button>
				</div>
			}
			onCancel={handleCancel}
			open={isShow}
		>
			<div className="col-12">
				<Form form={form} ref={formRef} onFinish={onFinish}>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: "Harap isi field ini",
							},
						]}
					>
						<div className="form-group">
							<span>
								Nama Negara <span className="text-danger">*</span>
							</span>
							<div className="controls">
								<Input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nama Negara"
									onChange={formik.handleChange}
									defaultValue={formik.values.name}
								/>
							</div>
						</div>
					</Form.Item>
				</Form>
			</div>
		</AntdModal>
	);
};
