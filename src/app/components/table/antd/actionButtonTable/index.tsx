import { Modal } from "antd";

export const ActionButtonTable = () => {
	return (
		<div style={{ display: "flex", columnGap: 5 }}>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#modal"
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
