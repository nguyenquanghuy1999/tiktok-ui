import * as httpRequest from "../utils/httpRequest";

export const suggestedAccounts = async () => {
    try {
        const res = await httpRequest.requestApiFake('suggested_accounts');
        return res.data;

    } catch (error) {
        console.log(error);
    }

}

export const suggestedAccountsMore = async () => {
    try {
        const res = await httpRequest.requestApiFake('suggested_accounts_more');
        return res.data;

    } catch (error) {
        console.log(error);
    }

}


