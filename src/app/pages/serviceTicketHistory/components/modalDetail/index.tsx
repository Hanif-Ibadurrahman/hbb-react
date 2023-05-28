import {
	useEffect,
	useState,
	useRef,
	Dispatch,
	SetStateAction,
	useMemo,
} from "react";
import {
	Modal as AntdModal,
	Button,
	Col,
	Divider,
	Form,
	FormInstance,
	Image,
	Input,
	Row,
	Tabs,
	TabsProps,
	Typography,
} from "antd";
import { useFormik } from "formik";
import { removeNullFields } from "app/helper/common";

interface IModalDetail {
	dataDetail: any;
	showModal: boolean;
	setShowModal: Dispatch<
		SetStateAction<{
			show: boolean;
			id?: number | undefined;
		}>
	>;
}

const ModalDetail = ({ dataDetail, showModal, setShowModal }: IModalDetail) => {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const [linkFile, setLinkFile] = useState<string[]>();
	const formRef = useRef<FormInstance>(null);
	const [initialValue, setInitialValue] = useState<{
		inventory_code?: string;
		type?: string;
		nama_pemakai?: string;
		emp_name?: string;
		description?: string;
		inventory_description?: string;
		condition?: string;
		created_at?: string;
		company_name?: string;
	}>();

	const formik = useFormik({
		initialValues: { ...initialValue },
		enableReinitialize: true,
		onSubmit: values => {},
	});

	useEffect(() => {
		if (dataDetail) {
			const setData = removeNullFields(dataDetail);
			setInitialValue(setData);
			setLinkFile(setData.attachment_file);
			formRef.current?.setFieldsValue(setData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataDetail]);

	const showFile = useMemo(() => {
		if (linkFile?.length) {
			return (
				<Row
					gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
					style={{ alignItems: "center" }}
				>
					{linkFile.map(link => {
						return (
							<Col className="gutter-row" span={6}>
								<Image width={100} src={link} />
							</Col>
						);
					})}
				</Row>
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [linkFile]);

	const itemTab: TabsProps["items"] = [
		{
			key: "1",
			label: `Detail`,
			children: (
				<>
					{formik.values.inventory_code && (
						<Form.Item name="inventory_code">
							<div className="form-group">
								<Title level={5}>No. HBB/Inventaris</Title>
								<div className="controls">
									<Input
										disabled
										type="text"
										className="form-control"
										value={formik.values.inventory_code}
									/>
								</div>
							</div>
						</Form.Item>
					)}
					<Form.Item name="type">
						<div className="form-group">
							<Title level={5}>Tipe Transaksi</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.type?.toUpperCase()}
								/>
							</div>
						</div>
					</Form.Item>
					{(formik.values.nama_pemakai || formik.values.emp_name) && (
						<Form.Item name="nama_pemakai">
							<div className="form-group">
								<Title level={5}>Nama Pemakai Akhir</Title>
								<div className="controls">
									<Input
										disabled
										type="text"
										className="form-control"
										value={formik.values.nama_pemakai ?? formik.values.emp_name}
									/>
								</div>
							</div>
						</Form.Item>
					)}
					{(formik.values.description ||
						formik.values.inventory_description) && (
						<Form.Item name="description">
							<div className="form-group">
								<Title level={5}>Deskripsi HBB/Inventaris</Title>
								<div className="controls">
									<Input
										disabled
										type="text"
										className="form-control"
										value={
											formik.values.description ??
											formik.values.inventory_description
										}
									/>
								</div>
							</div>
						</Form.Item>
					)}
					{formik.values.condition && (
						<Form.Item name="condition">
							<div className="form-group">
								<Title level={5}>Kondisi</Title>
								<div className="controls">
									<Input
										disabled
										type="text"
										className="form-control"
										value={formik.values.condition}
									/>
								</div>
							</div>
						</Form.Item>
					)}
					<Form.Item name="created_at">
						<div className="form-group">
							<Title level={5}>Tanggal Dibuat</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.created_at}
								/>
							</div>
						</div>
					</Form.Item>
					<Form.Item name="company_name">
						<div className="form-group">
							<Title level={5}>Perusahaan</Title>
							<div className="controls">
								<Input
									disabled
									type="text"
									className="form-control"
									value={formik.values.company_name}
								/>
							</div>
						</div>
					</Form.Item>
				</>
			),
		},
		{
			key: "4",
			label: `File`,
			children: <>{showFile}</>,
		},
	];

	return (
		<AntdModal
			title={<Title level={3}>Detail Data</Title>}
			footer={
				<div style={{ display: "flex", justifyContent: "end", columnGap: 5 }}>
					<Button
						shape="round"
						size="large"
						onClick={() => setShowModal({ show: false })}
					>
						Close
					</Button>
				</div>
			}
			onCancel={() => setShowModal({ show: false })}
			open={showModal}
			width={800}
			destroyOnClose
		>
			<Form form={form} ref={formRef}>
				<Divider />
				<Tabs defaultActiveKey="1" items={itemTab} />
			</Form>
		</AntdModal>
	);
};

export default ModalDetail;
