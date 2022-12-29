import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import AccountItem from "../AccountItems";
import styles from "./SuggestedAccounts.module.scss";
import * as suggestedAccService from "../../../services/suggestedService";

const cx = classNames.bind(styles);

function SuggestedAccounts() {

    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [btnName, setBtnName] = useState("See all");

    useEffect(() => {
        (async () => {
            // call suggested default 5 Account
            const res = await suggestedAccService.suggested();
            if (res) setSuggestedAccounts(res);
        })()
    }, [])

    useEffect(() => {
        if (btnName != 'See all') {
            (async () => {
                const res = await suggestedAccService.suggested(2, 15);
                if (res) setSuggestedAccounts(prev => [...prev, ...res]);
            })()
        } else {
            setSuggestedAccounts(prev => prev.slice(0, 5));
        }
    }, [btnName])


    const handleMoreSuggested = () => {
        if (btnName === 'See all') {
            setBtnName('See less')
        } else {
            setBtnName('See all')
        }
    }


    return (
        <div className={cx("wrapper")}>
            <p className={cx('label')}>Suggested accounts</p>
            {suggestedAccounts.map((data, index) => (
                <AccountItem key={index} data={data} />
            ))}
            <p className={cx("btn-more")} onClick={handleMoreSuggested}>{btnName}</p>
        </div>
    )
}


export default memo(SuggestedAccounts);
