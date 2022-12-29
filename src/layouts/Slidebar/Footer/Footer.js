import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("wrapper")}>
            <ul className={cx("contact-list")}>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>About</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>TikTok Browse</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Newsroom</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Contact</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Careers</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>ByteDance</a>
                </li>
            </ul>
            <ul className={cx("contact-list")}>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>TikTok for Good</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Advertise</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Developers</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Transparency</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>TikTok Rewards</a>
                </li>
            </ul>
            <ul className={cx("contact-list")}>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Help</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Safety</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Terms</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Privacy</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Creator Portal</a>
                </li>
                <li className={cx("contact-item")}>
                    <a href="#" className={cx("contact-link")}>Community Guidelines</a>
                </li>
            </ul>
            <p className={cx("copyright")}>© 2022 TikTok</p>
        </div>
    )
}
export default memo(Footer);