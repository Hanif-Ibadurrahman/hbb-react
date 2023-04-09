import { Modal } from "antd";

export interface IButtonAction {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
	itemId: string;
}

export const ActionButtonTable = ({ setShowModal, itemId }: IButtonAction) => {
	return (
		<div style={{ display: "flex", columnGap: 5 }}>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => {
					setShowModal({ show: true, id: itemId });
				}}
			>
				Edit
			</button>
			<button
				type="button"
				className="btn"
				style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
				onClick={() => {
					Modal.confirm({
						title: "Hapus Data",
						content: "Apakah anda yakin ingin menghapus ini?",
						cancelText: "Batal",
						okText: "Hapus",
						okType: "danger",
					});
				}}
			>
				Delete
			</button>
		</div>
	);
};
