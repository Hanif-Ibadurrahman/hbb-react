import axios from "axios";

const token =
	"Y2t4enQxazBxMDAwMDRtbzFoamM0OGZvMw.AH8RikIhHAo5M41Ph4KoNmkWSePX4h1Pk6m0N4MZicxhgniioMdlxT8j2T00";
export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
