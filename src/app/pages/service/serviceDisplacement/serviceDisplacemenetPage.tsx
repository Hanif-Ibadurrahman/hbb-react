import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceDisplacementPage = lazyLoad(
	() => import("app/pages/service/serviceDisplacement"),
	undefined,
	{ fallback: <Loading /> },
);
