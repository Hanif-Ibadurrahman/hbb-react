import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceDeletePage = lazyLoad(
	() => import("app/pages/service/serviceDelete"),
	undefined,
	{ fallback: <Loading /> },
);
