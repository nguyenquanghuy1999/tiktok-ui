import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Following.module.scss";
import VideoItem from "./VideoItem/VideoItem";
import * as suggestedService from "../../services/suggestedService";

const cx = classNames.bind(styles);

function Following() {

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await suggestedService.suggested(1, 15);
            if (res) setData(res);
        })()
    }, [])

    return (
        <div className={cx("wrapper")}>
            <div className={cx('inner')}>
                <div className={cx('video-list')}>
                    {data.map((user, index) => <VideoItem key={index} data={user} />)}
                </div>
            </div>
        </div>
    )
}
export default Following;