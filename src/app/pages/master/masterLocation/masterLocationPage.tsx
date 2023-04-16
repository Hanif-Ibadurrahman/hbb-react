import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterLocationPage = lazyLoad(
	() => import("app/pages/master/masterLocation"),
	undefined,
	{ fallback: <Loading /> },
);
