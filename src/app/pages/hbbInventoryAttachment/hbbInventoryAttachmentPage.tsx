import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const HbbInventarisAttachmentPage = lazyLoad(
	() => import("app/pages/hbbInventoryAttachment"),
	undefined,
	{ fallback: <Loading /> },
);
