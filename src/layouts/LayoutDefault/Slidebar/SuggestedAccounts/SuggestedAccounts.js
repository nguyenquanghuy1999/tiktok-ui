import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import AccountItem from "./AccountItem";
import styles from "./SuggestedAccounts.module.scss";
import * as suggestedAccService from "../../../../services/suggestedAccService";
import * as followingAccService from "../../../../services/followingAccService";

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {

    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [followingAccounts, setFollowingAccounts] = useState([]);
    const [btnName, setBtnName] = useState("See all");


    const handleMoreAccounts = () => {
        if (btnName.includes("See less")) {
            setSuggestedAccounts(prev => prev.slice(0, 5));
            setBtnName("See all")
            return;
        }
        if (label.includes("Suggested accounts")) {
            // call api suggestedAccountsMore
            (async () => {
                const res = await suggestedAccService.suggestedAccountsMore();
                if (res) {
                    setSuggestedAccounts((prev => [...prev, ...res]));
                    setBtnName("See less");
                }
            })()
        }
    }


    useEffect(() => {
        if (label.includes("Suggested accounts")) {
            // call api suggestedAccounts
            (async () => {
                const res = await suggestedAccService.suggestedAccounts();
                if (res) setSuggestedAccounts(res);
            })()

        } else if (label.includes("Following accounts")) {
            // call api followingAccounts
            (async () => {
                const res = await followingAccService.followingAccounts();
                if (res) setFollowingAccounts(res);
            })()
        }

    }, [])


    return (
        <div className={cx("wrapper")}>
            <p className={cx('label')}>{label}</p>

            {suggestedAccounts.map((data, index) => (
                <AccountItem
                    key={index}
                    src={data.avatar}
                    nickname={data.nickname}
                    fullName={data.full_name}
                    tick={data.tick}
                />
            ))}

            {followingAccounts.map((data, index) => (
                <AccountItem
                    key={index}
                    src={data.avatar}
                    nickname={data.nickname}
                    fullName={data.full_name}
                    tick={data.tick}
                />
            ))}

            <p className={cx("btn-more")} onClick={handleMoreAccounts}>{btnName}</p>

        </div>
    )
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired
}

export default SuggestedAccounts;
