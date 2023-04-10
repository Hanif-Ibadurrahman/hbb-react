import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { ICountry } from "store/types/countryTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<ICountry> = [
		{
			title: "Negara",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return <ActionButtonTable setShowModal={setShowModal} itemId={text} />;
			},
		},
	];
	return columnType;
};
