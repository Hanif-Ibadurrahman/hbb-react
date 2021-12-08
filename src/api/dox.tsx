import axios from "axios";

const token =
	"Y2t3eGI2aXJ2MDAwMjRtcGswMjc2YTE0Mg.kvThN9fe73u9Qpi6wBlKmv86k2cGyQpsgA91Q-jxSrnJGBtTQR2_uReEu8VJ";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
