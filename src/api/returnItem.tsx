import { ReturnItemInterfaceState } from "store/Types/ReturnItemTypes";
import api from "./dox";

export const create = async (data: ReturnItemInterfaceState) => {
    let payload = {
        delivered_at: data.delivered_at,
        delivery_method: data.delivery_method,
        note: data.note,
        box_codes: data.box_codes,
    };
    return api.post("/return", payload);
};

export const getAll = async params => {
    return api
        .get(`/boxes?status=borrowed`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};
