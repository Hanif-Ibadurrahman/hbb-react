import { TablePaginateAndSort } from "app/components/Table/Antd/TablePaginate";
import { MainLayout } from "app/layout/MainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { PaginationState } from "store/Types/PaginationTypes";
import { SideModal } from "app/components/Modal/SideModal";

const MasterBisnisUnit = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				bisnis_unit: `Bisnis Unit ${i}`,
			});
		}
		setFetchData({
			total: 100,
			per_page: 10,
			current_page: 1,
			last_page: 10,
			first_page_url: "",
			last_page_url: "",
			next_page_url: "",
			prev_page_url: "",
			path: "",
			from: 1,
			to: 10,
			data: data,
		});
	}, []);

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Bisnis Unit"
							dataSource={fetchData}
							columns={columns}
							setSelectedPage={setSelectedPage}
						/>
					</div>
				</div>
			</section>

			<SideModal title="Filter">
				<h5 className="box-title  mt-20 d-block mb-10">Bisnis Unit</h5>
				<div className="input-group">
					<input
						type="text"
						value=""
						data-role="tagsinput"
						placeholder="add tags"
					/>
					<span className="input-group-addon">Tags</span>
				</div>
			</SideModal>
		</MainLayout>
	);
};

export default MasterBisnisUnit;
