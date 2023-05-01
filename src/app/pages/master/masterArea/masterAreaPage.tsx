import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterArea
		? () => import("app/pages/master/masterArea")
		: () => import("app/pages/error/notFound");
};

export const MasterAreaPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
