import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceInspectionPage = lazyLoad(
	() => import("app/pages/service/serviceInspection"),
	undefined,
	{ fallback: <Loading /> },
);
