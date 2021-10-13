import React from "react";
import { Filter } from "app/components/Filter";
import Breadcrumb from "app/components/BreadCrumb";

export default function PageHeader(props) {
	return (
		<>
			<div className="d-flex jc-between ai-center mb-4">
				<Breadcrumb crumbs={props.breadcrumb} selected />
				<div className="d-flex ml-a">
					<Filter />
				</div>
			</div>
		</>
	);
}
