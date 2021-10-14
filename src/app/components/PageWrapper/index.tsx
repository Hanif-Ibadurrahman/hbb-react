import React from "react";

export const PageWrapper = props => {
	return (
		<div className={"pos-r p-8 mb-8" + props.className}>{props.children}</div>
	);
};
