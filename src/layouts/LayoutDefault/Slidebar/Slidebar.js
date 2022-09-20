import classNames from "classnames/bind";
import styles from "./Slidebar.module.scss";
const cx = classNames.bind(styles);

function Slidebar() {
    return (
        <div className={cx("wrapper")}>
            <h1>Slidebar</h1>
        </div>
    )
}
export default Slidebar;