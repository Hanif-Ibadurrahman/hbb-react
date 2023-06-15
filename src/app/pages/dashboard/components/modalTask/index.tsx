import { Dispatch, SetStateAction } from "react";
import { Modal as AntdModal, Table, Typography } from "antd";
import { columns } from "../table/columnAndDataType";

interface IModalTask {
	dataTable: any;
	isShowModal: boolean;
	setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const ModalTask = ({ dataTable, isShowModal, setIsShowModal }: IModalTask) => {
	const { Title } = Typography;
	const handleApprove = record => {};

	const handleReject = record => {};

	return (
		<AntdModal
			title={<Title level={3}>Task Approval</Title>}
			onCancel={() => setIsShowModal(false)}
			footer
			open={isShowModal}
			width={850}
			destroyOnClose
		>
			<Table
				columns={columns({ handleApprove, handleReject })}
				dataSource={dataTable}
				pagination={false}
				scroll={{ x: 850 }}
			/>
		</AntdModal>
	);
};

export default ModalTask;
