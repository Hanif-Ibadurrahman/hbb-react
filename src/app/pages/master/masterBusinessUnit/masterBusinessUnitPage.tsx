import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterBusinessUnitPage = lazyLoad(
	() => import("app/pages/master/masterBusinessUnit"),
	undefined,
	{ fallback: <Loading /> },
);
