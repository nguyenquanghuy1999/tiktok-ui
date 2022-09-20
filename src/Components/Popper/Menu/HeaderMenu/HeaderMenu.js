import PropTypes from 'prop-types';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "../Menu.module.scss";

const cx = classNames.bind(styles);


function HeaderMenu({ title, onBack }) {
    return (
        <div className={cx("header")}>
            <button className={cx("back-btn")} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className={cx("header-menu")}>{title}</span>
        </div>
    )
}

HeaderMenu.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired
}


export default HeaderMenu;