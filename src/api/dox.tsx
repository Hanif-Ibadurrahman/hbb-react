import axios from "axios";

const token =
	"Y2t3dGNsODZmMDAwMDRscGs3NXg5ODlpcQ.p_Lv4b5N8eckA5fKJhO86uRQx4VnvU36wVPynmao32wU4ro7W50G4nFw6l-Y";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
