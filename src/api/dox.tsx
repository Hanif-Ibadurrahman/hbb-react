import axios from "axios";

const token =
	"Y2t3eDMwOXVuMDAwMDRtcGtjdnRrYnJjZg.CbMjjmCJinrkt2xSiZxAUDj2z_VY1ZlKua1RP9CJuPWQ6bLcPGHrxbBAFYti";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
