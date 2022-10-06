import classNames from "classnames/bind";
import styles from "./Live.module.scss";

const cx = classNames.bind(styles);

function Live() {
    return (
        <div className={cx("wrapper")}>
            <h1>page Live</h1>
        </div>
    )
}
export default Live;