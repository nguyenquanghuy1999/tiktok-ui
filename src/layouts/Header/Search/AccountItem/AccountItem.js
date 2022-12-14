import PropTypes from 'prop-types';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Image from '../../../../Components/Image';
import styles from "./AccountItem.module.scss"

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} state={data}>
            <div className={cx("wrapper")}>
                <Image className={cx("avatar")} src={data.avatar} alt={data.full_name} />
                <div className={cx("info")}>
                    <p className={cx("user")}>
                        {data.nickname}
                        {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />}
                    </p>
                    <p className={cx("name")}>{data.full_name}</p>
                </div>
            </div>
        </Link>

    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired
}


export default AccountItem;