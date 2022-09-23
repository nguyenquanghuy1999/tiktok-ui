import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

import { default as PopperWrapper } from "../../../../Components/Popper"
import styles from "./SuggestedAccounts.module.scss";
import Image from "../../../../Components/Image";
import Button from "../../../../Components/Button"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AccountItem() {

    const AccountPreview = (props) => (
        <div tabIndex={-1} {...props}>
            <PopperWrapper>
                <div className={cx("preview-account")}>
                    <div className={cx("preview-header")}>
                        <Link to={"/@theanh28entertainment"}>
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1664002800&x-signature=49Sn6g95u9hlvIZfsuRhyoyywNA%3D"
                                alt=""
                                className={cx('preview-avatar')}

                            />
                        </Link>
                        <Button primary className={cx("btn-preview")}>Follow</Button>
                    </div>
                    <p className={cx("preview-nickname")}>
                        theanh28entertainment <FontAwesomeIcon icon={faCheckCircle} className={cx("preview-check")} />
                    </p>
                    <p className={cx("preview-Name")}>Theanh28 Entertainment</p>
                    <div className={cx("preview-analysic")}>
                        <strong className={cx("preview-value")}>7.3M</strong>
                        <span className={cx('preview-title')}>Followers</span>
                        <strong className={cx("preview-value")}>492.2M</strong>
                        <span className={cx("preview-title")}>Likes</span>
                    </div>

                </div>
            </PopperWrapper>
        </div>
    )

    return (
        <Tippy
            interactive
            placement='bottom'
            delay={[800, 0]}
            offset={[-30, 0]}
            render={AccountPreview}
        >
            <div className={cx("account-item")}>
                <Image
                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1664002800&x-signature=49Sn6g95u9hlvIZfsuRhyoyywNA%3D"
                    alt=""
                    className={cx("avatar")}
                />
                <div className={cx("info")}>
                    <p className={cx("nickname")}>
                        theanh28entertainment <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />
                    </p>
                    <span className={cx("name")}>Theanh28 Entertainment</span>
                </div>

            </div>
        </Tippy >
    )
}
export default AccountItem;