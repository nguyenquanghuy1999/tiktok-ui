import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import PropTypes from "prop-types";

import { default as PopperWrapper } from "../../../../Components/Popper"
import styles from "./SuggestedAccounts.module.scss";
import Image from "../../../../Components/Image";
import Button from "../../../../Components/Button"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AccountItem({ src, nickname, fullName, tick }) {

    const AccountPreview = (props) => (
        <div tabIndex={-1} {...props}>
            <PopperWrapper>
                <div className={cx("preview-account")}>
                    <div className={cx("preview-header")}>
                        <Link to={`/@${nickname}`}>
                            <Image
                                src={src}
                                alt=""
                                className={cx('preview-avatar')}

                            />
                        </Link>
                        <Button primary className={cx("btn-preview")}>Follow</Button>
                    </div>
                    <p className={cx("preview-nickname")}>
                        {nickname} {tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("preview-check")} />}
                    </p>
                    <p className={cx("preview-Name")}>{fullName}</p>
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
            appendTo={document.body}
            placement='bottom'
            delay={[800, 0]}
            offset={[-30, 0]}
            render={AccountPreview}
        >

            <Link to={`/@${nickname}`}>
                <div className={cx("account-item")}>
                    <Image
                        src={src}
                        alt=""
                        className={cx("avatar")}
                    />
                    <div className={cx("info")}>
                        <p className={cx("nickname")}>
                            {nickname} {tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />}
                        </p>
                        <span className={cx("name")}>{fullName}</span>
                    </div>

                </div>
            </Link>

        </Tippy >
    )
}

AccountItem.propTypes = {
    src: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    tick: PropTypes.bool.isRequired
}

export default AccountItem;