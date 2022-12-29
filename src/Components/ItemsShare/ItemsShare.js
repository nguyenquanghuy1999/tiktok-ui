import { useState } from 'react';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./ItemsShare.module.scss"
import Button from '../Button';
import { default as PopperWrapper } from '../Popper/Wrapper';
import * as Icons from "../Icons"

const itemsOfShare = [
    {
        title: "Embed",
        icon: <Icons.EmbedIcon />
    },
    {
        title: "Send to friends",
        icon: <Icons.SendToIcon />
    },
    {
        title: "Share to Facebook",
        icon: <Icons.FbIcon />
    },
    {
        title: "Share to WhatsApp",
        icon: <Icons.WhatsAppIcon />
    },
    {
        title: "Copy link",
        icon: <Icons.CopyLinkIcon />
    },
];

const itemShareMore = [
    {
        title: "Share to Twitter",
        icon: <Icons.TwitterCircleIcon />
    },
    {
        title: "Share to Linkedln",
        icon: <Icons.LinkedlnIcon />
    },
    {
        title: "Share to Telegram",
        icon: <Icons.TelegramIcon />
    },
    {
        title: "Share to Email",
        icon: <Icons.EmailIcon />
    },
    {
        title: "Share to Line",
        icon: <Icons.LineIcon />
    },
    {
        title: "Share to Pinterest",
        icon: <Icons.PinterestIcon />
    },
]

const cx = classNames.bind(styles);

function ItemsShare({ children, offset }) {

    const [itemsShare, setItemShare] = useState(itemsOfShare);
    const [isBtnMore, setIsBtnMore] = useState(true)


    const handleMoreItems = () => {
        setItemShare(prev => [...prev, ...itemShareMore])
        setIsBtnMore(false);
    }

    const handleHidden = () => {
        setItemShare(prev => prev.slice(0, 5));
        setIsBtnMore(true);
    }

        return (
            <Tippy
            onHidden={handleHidden}
            interactive
            delay={[0, 500]}
            placement="top"
            offset={offset}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <PopperWrapper className={cx("custom-popper")}>
                        <div className={cx("list-item-share")}>
                            {itemsShare.map((item, index) => (
                                <Button
                                    href="#"
                                    key={index}
                                    children={item.title}
                                    leftIcon={item.icon}
                                    className={cx("popper-btn-share")}
                                />
                            ))}
                            {isBtnMore &&
                                <Button
                                    children={<FontAwesomeIcon icon={faChevronDown} />}
                                    className={cx("btn-more")}
                                    onClick={handleMoreItems}
                                />}

                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>

    )
}
export default ItemsShare;