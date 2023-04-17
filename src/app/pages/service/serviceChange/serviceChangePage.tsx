import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceChangePage = lazyLoad(
	() => import("app/pages/service/serviceChange"),
	undefined,
	{ fallback: <Loading /> },
);
