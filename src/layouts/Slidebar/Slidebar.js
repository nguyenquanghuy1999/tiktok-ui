import classNames from "classnames/bind";
import styles from "./Slidebar.module.scss";
import config from "../../config"
import Menu, { MenuItem } from "./Menu";
import * as Icons from '../../Components/Icons'
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import FollowingAccounts from "./FollowingAccounts";
import Button from "../../Components/Button";
import { ModalContext } from "../../Components/ModalProvider";
import { useContext } from "react";

const cx = classNames.bind(styles);

function Slidebar({ shrink }) {

    const context = useContext(ModalContext);

    return (
        <div className={cx("wrapper", { shrink: shrink })}>
            <Menu>
                <MenuItem to={config.routes.home} title='For you' icon={<Icons.HomeIcon />} iconActive={<Icons.HomeIconActive />} />
                <MenuItem to={config.routes.following} title='Following' icon={<Icons.PeopleGroupIcon />} iconActive={<Icons.PeopleGroupIconActive />} />
                <MenuItem to={config.routes.live} title='Live' icon={<Icons.LiveIcon />} iconActive={<Icons.LiveIconActive />} />
            </Menu>
            <div className={cx('login')}>
                <p className={cx('login-hint')}>Log in to follow creators, like videos, and view comments.</p>
                <Button
                    outline
                    large
                    className={cx('login-btn')}
                    onClick={() => context.showModalLogin ()}
                >
                    Log in
                </Button>
            </div>

            <SuggestedAccounts />
            {/* <FollowingAccounts /> */}
            <Footer />
        </div >
    )
}
export default Slidebar;