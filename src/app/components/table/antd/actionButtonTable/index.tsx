export interface IButtonAction {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
	handleDelete?: (id: string) => void;
	itemId: string;
}

export const ActionButtonTable = ({
	setShowModal,
	handleDelete,
	itemId,
}: IButtonAction) => {
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
					if (handleDelete) {
						handleDelete(itemId);
					}
				}}
			>
				Delete
			</button>
		</div>
	);
};
