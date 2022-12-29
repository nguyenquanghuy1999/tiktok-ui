import { useContext } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { default as PopperWrapper } from "../Popper";
import Button from "../Button";
import Image from "../Image";
import style from './AccountPreview.module.scss';
import { ModalContext } from "../ModalProvider";

const cx = classNames.bind(style);

function AccountPreview({ data, btnOutline, btnPrimary }) {

    const context = useContext(ModalContext);

    return (
        <div tabIndex={-1} onClick={e => e.preventDefault()}>
            <PopperWrapper>
                <div className={cx("preview-account")} >
                    <div className={cx("preview-header")}>
                        <Link to={`/@${data?.nickname}`} state={data}>
                            <Image
                                src={data?.avatar}
                                alt=""
                                className={cx('preview-avatar')}
                            />
                        </Link>
                        <Button
                            outline={btnOutline}
                            primary={btnPrimary}
                            className={cx("btn-preview")}
                            onClick={() => context.showModalLogin()}
                        >
                            Follow
                        </Button>
                    </div>
                    <p className={cx("preview-nickname")}>
                        {data?.nickname} {data?.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("preview-check")} />}
                    </p>
                    <p className={cx("preview-Name")}>{`${data?.first_name} ${data?.last_name}`}</p>
                    <div className={cx("preview-analysic")}>
                        <strong className={cx("preview-value")}>{data?.followers_count}</strong>
                        <span className={cx('preview-title')}>Followers</span>
                        <strong className={cx("preview-value")}>{data?.likes_count}</strong>
                        <span className={cx("preview-title")}>Likes</span>
                    </div>
                </div>
            </PopperWrapper>
        </div>
    )
}
export default AccountPreview;