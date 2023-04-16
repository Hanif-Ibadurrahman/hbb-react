import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const RoomInventoryPage = lazyLoad(
	() => import("app/pages/roomInventory"),
	undefined,
	{ fallback: <Loading /> },
);
