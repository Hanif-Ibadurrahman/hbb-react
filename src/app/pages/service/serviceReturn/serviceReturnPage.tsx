import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceReturnPage = lazyLoad(
	() => import("app/pages/service/serviceReturn"),
	undefined,
	{ fallback: <Loading /> },
);
