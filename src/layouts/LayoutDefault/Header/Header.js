import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import TippyTootips from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import {
    faAdd,
    faArrowRightFromBracket,
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.scss";
import logo from "../../../assets/images/TikTok-Logo.png";
import Button from "../../../Components/Button";
import Menu from "../../../Components/Popper/Menu";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { InboxIcon, MessageIcon } from "../../../Components/Icons";
import Image from '../../../Components/Image';
import Search from "./Search";
import config from "../../../config";


const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: "English",
        children: {
            title: "language",
            data: [
                {
                    code: "en",
                    title: "English"
                },
                {
                    code: "vi",
                    title: "Tiếng việt",
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: "Feedback and help",
        to: "/feedback"
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: "Keyboard shortcuts",
    }
];

const userSetting = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: "View profile",

    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: "Get coins",
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: "Settings",
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: "Log out",
        separate: true,
    },
]

function Header() {
    const userLogin = true;

    // const handleMenuChange = (item) => {
    //     console.log(item);
    // }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link to={config.routes.home}>
                    <img src={logo} className={cx('logo')} />
                </Link>

                <Search />

                <div className={cx("action")}>
                    <Button
                        outline
                        className={cx("upload-btn")}
                        leftIcon={<FontAwesomeIcon icon={faAdd} />}
                    >
                        Upload
                    </Button>
                    {userLogin ? (
                        <>
                            <TippyTootips content="Message">
                                <MessageIcon className={cx("icon")} />
                            </TippyTootips>

                            <TippyTootips content="Inbox">
                                <InboxIcon className={cx("icon", "inbox-icon")} />
                            </TippyTootips>
                            <span className={cx("badge")}>12</span>

                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={userLogin ? userSetting : MENU_ITEMS}>
                        {userLogin ? (
                            <Image
                                className={cx("img-avatar")}
                                src="https://giadinh.mediacdn.vn/zoom/740_463/296230595582509056/2021/9/28/photo1632791990884-16327919910441681561234.jpg"
                                alt="Đỗ Mỹ Linh"
                            />
                        ) : (
                            <button className={cx("button-more")}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div >
        </div >
    )
}
export default Header;