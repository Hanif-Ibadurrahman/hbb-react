import axios from "axios";

const token =
	"Y2t4cTZmbDQxMDAwYzVqbnQxNm5hYmYyZg.GQpMG76xviMRRQOMkbw5Eg5j3FfVUzt2we3ZhcCVW0pxBaMlgCvZ_l_wbgTa";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
