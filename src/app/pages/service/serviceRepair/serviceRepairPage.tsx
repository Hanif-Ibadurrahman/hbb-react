import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceRepairPage = lazyLoad(
	() => import("app/pages/service/serviceRepair"),
	undefined,
	{ fallback: <Loading /> },
);
