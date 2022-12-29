import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import AccountItem from "../AccountItems";
import styles from "./FollowingAccounts.module.scss";

const cx = classNames.bind(styles);

function FollowingAccounts() {

    const [followings, setFollwings] = useState([]);
    const [btnName, setBtnName] = useState("See all");

    // const handleMoreAccounts = () => {
    //     if (btnName === "See all") {
    //         (async () => {
    //             const res = await suggestedAccService.suggested(2, 15);
    //             if (res) setSuggestedAccounts(prev => [...prev, ...res]);
    //         })()
    //         setBtnName("See less")
    //     } else {
    //         setSuggestedAccounts(prev => prev.slice(0, 5));
    //         setBtnName("See all")
    //     }
    // }

    useEffect(() => {
        // (async () => {
        //     // call suggested default 5 Account
        //     const res = await suggestedAccService.suggested();
        //     if (res) setSuggestedAccounts(res);
        // })()

        // const localStorageKey = '__auth_provider_token__';
        const authURL = 'https://tiktok.fullstack.edu.vn/api/me/followings?page=1';
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2ODE1NTg0MywiZXhwIjoxNjcwNzQ3ODQzLCJuYmYiOjE2NjgxNTU4NDMsImp0aSI6Iml1YjhtUFNZeWszZlYzckkiLCJzdWIiOjQxMzcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.0eS5KxS8rI6o7yEtt-8IHGbQT0OfTEtHRB2GXrlVSvM';
        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
        fetch(authURL, config)
            .then(res => res.json())
            .then(res => {
                setFollwings(res.data)
            })
    }, [])

    return (
        <div className={cx("wrapper")}>
            <p className={cx('label')}>Following accounts</p>
            {followings.map((data, index) => (
                <AccountItem key={index} data={data} />
            ))}
            <p className={cx("btn-more")}>{btnName}</p>
        </div>
    )
}


export default memo(FollowingAccounts);
