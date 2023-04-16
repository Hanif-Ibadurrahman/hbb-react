import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const DashboardPage = lazyLoad(
	() => import("app/pages/dashboard"),
	undefined,
	{ fallback: <Loading /> },
);
