// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { faCheckCircle, faCommentDots, faHeart, faMusic, faPlay, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import styles from "./ListForYou.module.scss"
import Button from "../Button"
import * as Icons from "../Icons"

const cx = classNames.bind(styles);

function ListForYou({ data }) {
    return (
        <div className={cx("home-item")}>
            <img
                src={data.avatar}
                alt=""
                className={cx("avatar")}
            />
            <div className={cx("infos")}>
                <div className={cx('info-header')}>
                    <Link to="#">
                        <h3 className={cx("nickname")}>{data.nickname}</h3>
                    </Link>
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />}
                    <span className={cx("full-name")}>{data.full_name}</span>
                </div>
                <p className={cx("caption")}>{data.caption}</p>
                <a className={cx("link-test")}>{data.hashtag}</a>
                <div className={cx('caption-and-hashtag')}>
                    <FontAwesomeIcon icon={faMusic} className={cx("icon-music")} />
                    <Link to="#" className={cx("link-music")}>{data.link_music}</Link>
                </div>

                <div className={cx("video-and-actions")}>
                    <div className={cx('video-wrap')}>
                        <video className={cx("video")}>
                            <source src={require(`${data.video}`)} type="video/mp4" />
                        </video>
                        <div className={cx('video-controls')}>
                            <div className={cx("video-play")}>
                                <FontAwesomeIcon icon={faPlay} className={cx("play")}   />
                            </div>
                            <div className={cx("video-sound")}>
                                <Icons.VolumeIcon className={cx("volume")} />
                            </div>

                        </div>
                    </div>

                    <div className={cx("actions")}>
                        <button className={cx("btn")}>
                            <span className={cx("wrap-icon")}>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </span>
                            <p className={cx('counts')}>229.6K</p>
                        </button>
                        <button className={cx("btn")}>
                            <span className={cx("wrap-icon")}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </span>
                            <p className={cx('counts')}>760</p>
                        </button>
                        <button className={cx("btn")}>
                            <span className={cx("wrap-icon")}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                            </span>
                            <p className={cx('counts')}>230</p>
                        </button>
                    </div>
                </div>
            </div>
            <Button outline className={cx("btn-follow")}>Follow</Button>
        </div>
    );
}

// ListForYou.propTypes = {
//     data: PropTypes.object.isRequired
// }


export default ListForYou;