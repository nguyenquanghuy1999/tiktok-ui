import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./AccountItem.module.scss";
import Image from "../../../Components/Image";
import AccountPreview from "../../../Components/AccountPreview";

const cx = classNames.bind(styles);

function AccountItem({ data }) {

    return (
        <Tippy
            interactive
            appendTo={document.body}
            placement='bottom'
            delay={[800, 0]}
            offset={[-30, 0]}
            render={() => <AccountPreview data={data} btnPrimary />}
        >
            <Link to={`/@${data.nickname}`} state={data}>
                <div className={cx("account-item")}>
                    <Image
                        src={data.avatar}
                        alt=""
                        className={cx("avatar")}
                    />
                    <div className={cx("info")}>
                        <p className={cx("nickname")}>
                            {data.nickname} {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />}
                        </p>
                        <span className={cx("name")}>{`${data.first_name} ${data.last_name}`}</span>
                    </div>

                </div>
            </Link>
        </Tippy >
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default AccountItem;