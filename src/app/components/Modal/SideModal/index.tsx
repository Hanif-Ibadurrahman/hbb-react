interface ISideModal {
	title?: string;
	children?: React.ReactNode;
	position?: "right" | "left";
}

export const SideModal = ({ title, children, position }: ISideModal) => {
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
					<div className="modal-footer modal-footer-uniform">
						<button
							type="button"
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							Reset
						</button>
						<button
							type="button"
							className="btn btn-primary float-end"
							data-bs-dismiss="modal"
						>
							Filter
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
