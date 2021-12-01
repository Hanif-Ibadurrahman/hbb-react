import axios from "axios";

const token =
	"Y2t3bmd1MWNjMDAwNTRtcGUxNTJ0OXY3Mw.sL1Eqiy3NlVH84mFYNKKksgvI23jFxffHeGpa2QJhjW1Xk2-nYaG4LvyjnRk";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
