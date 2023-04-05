interface ICenterModal {
	modalName: string;
	title?: string;
	children?: React.ReactNode;
	contentFooter?: JSX.Element;
}

export const CenterModal = ({
	title,
	modalName,
	children,
	contentFooter,
}: ICenterModal) => {
	return (
		<div
			id={modalName}
			className="modal fade"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="myLargeModalLabel"
			aria-hidden="true"
			style={{ display: "none" }}
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title" id="myLargeModalLabel">
							{title}
						</h4>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">{children}</div>
					<div
						className="modal-footer"
						style={{ display: "flex", columnGap: 5 }}
					>
						<button
							type="button"
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							Close
						</button>
						{contentFooter}
					</div>
				</div>
			</div>
		</div>
	);
};
