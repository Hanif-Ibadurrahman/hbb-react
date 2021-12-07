import axios from "axios";

const token =
	"Y2t3dmpsZzg3MDAwMDRscGtnbGxtOGxjNQ.qvkqij8w7ofMKrIAl2LgdNI-AciH8r7xa2zCJnSWjqxzn57LlXwAvjOBp8vH";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
