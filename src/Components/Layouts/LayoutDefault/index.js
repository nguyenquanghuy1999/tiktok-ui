import classNames from "classnames/bind";
import Header from "./Header"
import Slidebar from "./Sliderbar"
import styles from "./LayoutDefault.module.scss";

const cx = classNames.bind(styles);


function LayoutDefault({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <Slidebar />
                <div className={cx("content")}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default LayoutDefault;