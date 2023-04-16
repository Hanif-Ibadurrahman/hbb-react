import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterWorkUnitPage = lazyLoad(
	() => import("app/pages/master/masterWorkUnit"),
	undefined,
	{ fallback: <Loading /> },
);
