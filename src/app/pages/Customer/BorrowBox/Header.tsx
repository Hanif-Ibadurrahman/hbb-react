import React, { useState } from "react";
import Breadcrumb from "app/components/BreadCrumb";
import { Link } from "react-router-dom";
import { Filter } from "app/components/Filter";

export function Header() {
	const [crumbs, setCrumbs] = useState(["Dashboard", "Customer", "Borrow Box"]);

	return (
		<>
			<div className="d-flex jc-between ai-center mb-4">
				<Breadcrumb crumbs={crumbs} selected />
				<div className="d-flex">
					<Filter />
				</div>
			</div>
		</>
	);
}
