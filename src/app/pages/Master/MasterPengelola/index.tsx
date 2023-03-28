import { TablePaginateAndSort } from "app/components/Table/Antd/TablePaginateAndSort";
import { MainLayout } from "app/layout/MainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { PaginationState } from "store/Types/PaginationTypes";

const MasterPenyedia = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nama_user: `PGNMAS ${i}`,
				nipg: `123124412`,
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
							title="Pengelola"
							dataSource={fetchData}
							columns={columns}
							setSelectedPage={setSelectedPage}
						/>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default MasterPenyedia;
