import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceRequestPage = lazyLoad(
	() => import("app/pages/service/serviceRequest"),
	undefined,
	{ fallback: <Loading /> },
);
