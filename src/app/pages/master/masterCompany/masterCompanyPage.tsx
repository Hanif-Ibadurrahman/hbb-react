import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterCompanyPage = lazyLoad(
	() => import("app/pages/master/masterCompany"),
	undefined,
	{ fallback: <Loading /> },
);
