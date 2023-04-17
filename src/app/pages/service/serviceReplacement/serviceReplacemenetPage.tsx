import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceReplacementPage = lazyLoad(
	() => import("app/pages/service/serviceReplacement"),
	undefined,
	{ fallback: <Loading /> },
);
