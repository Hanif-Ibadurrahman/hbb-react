import { useEffect, useState } from "react";
import { Modal as AntdModal, Table, Typography } from "antd";
import { columns } from "../table/columnAndDataType";

interface IModalTask {
	dataTable: any;
}

const ModalTask = ({ dataTable }: IModalTask) => {
	const { Title } = Typography;
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	useEffect(() => {
		setIsShowModal(dataTable.length ? true : false);
	}, [dataTable]);

	return (
		<AntdModal
			title={<Title level={3}>Task Approval</Title>}
			onCancel={() => setIsShowModal(false)}
			footer
			open={isShowModal}
			width={1200}
			destroyOnClose
		>
			<Table columns={columns()} dataSource={dataTable} pagination={false} />
		</AntdModal>
	);
};

export default ModalTask;
