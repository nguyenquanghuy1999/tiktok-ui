import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import * as Icons from '../Icons'
import styles from "./GetApps.module.scss";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function GetApps() {

    const [isDownApps, setIsDownApps] = useState(false);
    const downAppsRef = useRef();

    const handleClickBtn = () => {
        setIsDownApps(true);
    }

    const handleClose = () => {
        downAppsRef.current.animate([
            { transform: "scale(1)", transformOrigin: "bottom right" },
            { transform: "scale(0)", transformOrigin: "bottom right" },
        ], { duration: 200 })
        setTimeout(() => setIsDownApps(false), 150)
    }

    return (
        <div className={cx('get-app', { isDownApps: isDownApps })}>
            <Button
                rounded
                className={cx('btn-get-app')}
                onClick={handleClickBtn}>
                Get app
            </Button>
            <div ref={downAppsRef} className={cx('down-apps')}>
                <div className={cx('down-app')}>
                    <Icons.DesktopIcon />
                    <span className={cx('down-app-title')}>Get TikTok for desktop</span>
                </div>
                <div className={cx('down-app')}>
                    <Icons.MobileIcon />
                    <span className={cx('down-app-title')}>Get TikTok for desktop</span>
                </div>
                <span className={cx('close-apps')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

        </div >

    )
}
export default GetApps;