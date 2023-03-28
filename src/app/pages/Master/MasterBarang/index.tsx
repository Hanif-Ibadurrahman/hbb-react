import { TablePaginateAndSort } from "app/components/Table/Antd/TablePaginateAndSort";
import { MainLayout } from "app/layout/MainLayout";
import { useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";

const MasterBarang = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nama_barang: `Barang ${i}`,
				merk: "Sharp",
				tipe: "XQ 380",
				jenis: "0",
				model: "injection",
				warna: "Hitam",
				kapasitas: "0",
				ukuran: "0",
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
							title="Barang"
							dataSource={fetchData}
							columns={columns}
							setSelectedPage={setSelectedPage}
							contentHeader={
								<button
									type="button"
									className="btn btn-primary"
									data-bs-toggle="modal"
									data-bs-target="#modal_add"
								>
									Tambah
								</button>
							}
						/>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default MasterBarang;
