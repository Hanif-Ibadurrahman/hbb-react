import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const WarehouseCheckInOutPage = lazyLoad(
	() => import("app/pages/warehouseCheckInOut"),
	undefined,
	{ fallback: <Loading /> },
);
