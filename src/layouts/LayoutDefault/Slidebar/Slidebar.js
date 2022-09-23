import classNames from "classnames/bind";
import styles from "./Slidebar.module.scss";
import config from "../../../config"
import Menu, { MenuItem } from "./Menu";
import * as Icons from '../../../Components/Icons'
import SuggestedAccounts from "./SuggestedAccounts";

const cx = classNames.bind(styles);

function Slidebar() {
    return (
        <div className={cx("wrapper")}>
            <Menu>
                <MenuItem to={config.routes.home} title='For you' icon={<Icons.HomeIcon />} iconActive={<Icons.HomeIconActive />} />
                <MenuItem to={config.routes.following} title='Following' icon={<Icons.PeopleGroupIcon />} iconActive={<Icons.PeopleGroupIconActive />} />
                <MenuItem to={config.routes.live} title='Live' icon={<Icons.LiveIcon />} iconActive={<Icons.LiveIconActive />} />
            </Menu>

            <SuggestedAccounts label={'Suggested accounts'} />

            <SuggestedAccounts label={'Following accounts'} />
        </div>
    )
}
export default Slidebar;