import classNames from "classnames/bind";
import styles from "./Following.module.scss";

const cx = classNames.bind(styles);

function Following() {
    return (
        <div className={cx("wrapper")}>
            <h1>page Following</h1>
        </div>
    )
}
export default Following;