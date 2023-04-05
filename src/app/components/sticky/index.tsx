export const Sticky = () => {
	return (
		<div className="sticky-toolbar">
			<a
				href="#"
				data-bs-toggle="tooltip"
				data-bs-placement="left"
				title="Buy Now"
				className="waves-effect waves-light btn btn-success btn-flat btn-sm mb-5"
				target="_blank"
			>
				<span className="icon-Money">
					<span className="path1"></span>
					<span className="path2"></span>
				</span>
			</a>
			<a
				href="#"
				data-bs-toggle="tooltip"
				data-bs-placement="left"
				title="Portfolio"
				className="waves-effect waves-light btn btn-danger btn-flat btn-sm mb-5"
				target="_blank"
			>
				<span className="icon-Image"></span>
			</a>
			<a
				id="chat-popup"
				href="#"
				data-bs-toggle="tooltip"
				data-bs-placement="left"
				title="Live Chat"
				className="waves-effect waves-light btn btn-warning btn-flat btn-sm"
			>
				<span className="icon-Group-chat">
					<span className="path1"></span>
					<span className="path2"></span>
				</span>
			</a>
		</div>
	);
};
