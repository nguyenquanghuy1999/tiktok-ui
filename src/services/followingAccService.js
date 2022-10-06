import * as httpRequest from "../utils/httpRequest";

export const followingAccounts = async () => {
    try {
        const res = await httpRequest.requestApiFake('following_accounts');
        return res.data;

    } catch (error) {
        console.log(error);
    }

}

