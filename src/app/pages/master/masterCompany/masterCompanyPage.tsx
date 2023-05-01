import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterCompany
		? () => import("app/pages/master/masterCompany")
		: () => import("app/pages/error/notFound");
};

export const MasterCompanyPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
