import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const HbbInventoryPage = lazyLoad(
	() => import("app/pages/hbbInventory"),
	undefined,
	{ fallback: <Loading /> },
);
