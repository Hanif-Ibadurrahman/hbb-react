import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterCountry
		? () => import("app/pages/master/masterCountry")
		: () => import("app/pages/error/notFound");
};

export const MasterCountryPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
