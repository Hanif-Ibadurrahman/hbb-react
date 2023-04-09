interface ISideModal {
	title?: string;
	children?: React.ReactNode;
	position?: "right" | "left";
	contentFooter?: JSX.Element;
}

export const SideModal = ({
	title,
	children,
	position,
	contentFooter,
}: ISideModal) => {
	const classNameModal = position
		? `modal modal-${position} fade`
		: "modal modal-right fade";

	return (
		<div className={classNameModal} id="modal-side" tabIndex={-1}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">{children}</div>
					<div
						className="modal-footer modal-footer-uniform"
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
