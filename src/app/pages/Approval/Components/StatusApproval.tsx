import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function StatusApproval(props) {
	const status = props.status;
	const tooltiptext = props.tooltip;

	return (
		<OverlayTrigger
			delay={{ hide: 450, show: 300 }}
			overlay={props => (
				<Tooltip {...props}>
					{status === "waiting"
						? tooltiptext[0]
						: status === "approved"
						? tooltiptext[1]
						: tooltiptext[2]}
				</Tooltip>
			)}
			placement="top"
		>
			<span className={"pv-1 ph-2 bd-rs-2 status-" + status}>
				<span className="p-sm txtf-c">{status}</span>
			</span>
		</OverlayTrigger>
	);
}
