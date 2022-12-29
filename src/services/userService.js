import * as httpRequest from "../utils/httpRequest";

export const loadUser = async (name) => {
    try {
        const res = await httpRequest.get(`users/@${name}`);
        return res.data;

    } catch (error) {
        console.log(error);
    }

}

