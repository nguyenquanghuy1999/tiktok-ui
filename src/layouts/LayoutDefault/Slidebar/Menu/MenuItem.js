import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);


function MenuItem({ to, title, icon, iconActive }) {
    return (
        <NavLink to={to} className={nav => cx("item", { active: nav.isActive })}>
            <span className={cx("icon")}>{icon}</span>
            <span className={cx('icon-active')}>{iconActive}</span>
            <span className={cx("item-title")}>{title}</span>
        </NavLink>
    )
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
}

export default MenuItem;