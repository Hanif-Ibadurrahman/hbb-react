import React from "react";
import "./breadcrumb.scoped.scss";

export default function Breadcrumb(props) {
	function isLast(index) {
		return index === props.crumbs.length - 1;
	}

	return (
		<ol className={"breadcrumb " + props.className}>
			{props.crumbs.map((crumb, ci) => {
				const disabled = isLast(ci) ? "disabled" : "";

				return (
					<li key={ci} className="breadcrumb-item align-items-center">
						<button
							className={`btn btn-link ${disabled}`}
							onClick={() => (window.location.pathname = crumb)}
						>
							{crumb}
						</button>
					</li>
				);
			})}
		</ol>
	);
}
