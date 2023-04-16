import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterCountryPage = lazyLoad(
	() => import("app/pages/master/masterCountry"),
	undefined,
	{ fallback: <Loading /> },
);
