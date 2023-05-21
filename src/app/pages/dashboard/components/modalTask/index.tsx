import { useState } from "react";
import { Modal as AntdModal, Table, Typography } from "antd";
import { columns } from "../table/columnAndDataType";

const ModalTask = () => {
	const dataTask = [
		{
			transaction_no: "001/PERMINTAAN/2023",
			inventory_type: "PERMINTAAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
		{
			transaction_no: "001/PERUBAHAN/2023",
			inventory_type: "PERUBAHAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
		{
			transaction_no: "001/PENGGANTIAN/2023",
			inventory_type: "PENGGANTIAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
		{
			transaction_no: "001/PERBAIKAN/2023",
			inventory_type: "PERBAIKAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
		{
			transaction_no: "001/PEMERIKSAAN/2023",
			inventory_type: "PEMERIKSAAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
		{
			transaction_no: "001/PENGEMBALIAN/2023",
			inventory_type: "PENGEMBALIAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
		{
			transaction_no: "001/PENGHAPUSAN/2023",
			inventory_type: "PENGHAPUSAN",
			note: "Dummy bukan dari api",
			created_at: "2023/01/01",
		},
	];
	const { Title } = Typography;
	const [isShowModal, setIsShowModal] = useState<boolean>(true);

	return (
		<AntdModal
			title={<Title level={3}>Task Approval</Title>}
			onCancel={() => setIsShowModal(false)}
			footer
			open={isShowModal}
			width={1200}
			destroyOnClose
		>
			<Table columns={columns()} dataSource={dataTask} pagination={false} />
		</AntdModal>
	);
};

export default ModalTask;
