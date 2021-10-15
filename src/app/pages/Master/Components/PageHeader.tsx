import React from "react";
import { Filter } from "app/components/Filter";
import Breadcrumb from "app/components/BreadCrumb";
import { Button } from "react-bootstrap";

export default function PageHeader(props) {
	return (
		<>
			<div className="d-flex jc-between ai-center mb-4">
				<Breadcrumb crumbs={props.breadcrumb} selected />
				<div className="d-flex ml-a">
					<Filter />
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
					>
						Template Upload<i className="fas fa-file ml-2"></i>
					</Button>{" "}
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
					>
						Import<i className="fas fa-upload ml-2"></i>
					</Button>{" "}
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
					>
						Export<i className="fas fa-download ml-2"></i>
					</Button>{" "}
					{props.addForm}
				</div>
			</div>
		</>
	);
}
