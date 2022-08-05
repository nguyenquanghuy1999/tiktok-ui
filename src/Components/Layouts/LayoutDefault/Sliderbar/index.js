import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Slidebar.module.scss";

const cx = classNames.bind(styles);

function Slidebar() {
    return (
        <div className={cx("wrapper")}>
            <h1>Slidebar</h1>
            <ul className={cx("list")}>
                <li>
                    <Link to="/" className={cx("list-item-link")} >Home</Link>
                </li>
                <li>
                    <Link to="/following" className={cx("list-item-link")}>Following</Link>
                </li>
            </ul>
        </div>
    )
}
export default Slidebar;