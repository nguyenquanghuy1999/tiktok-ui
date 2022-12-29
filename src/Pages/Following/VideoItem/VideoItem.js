import classNames from "classnames/bind";
import { useContext, useRef } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './VideoItem.module.scss';
import Button from '../../../Components/Button';
import Image from '../../../Components/Image';
import { ModalContext } from "../../../Components/ModalProvider";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function VideoItem({ data }) {

    const context = useContext(ModalContext);
    const videoRef = useRef();

    return (
        <Link to={`/@${data.nickname}`}>
            <div
                className={cx('video-item')}
                onMouseMove={() => videoRef.current.play()}
                onMouseOut={() => videoRef.current.pause()}>
                <img
                    className={cx('image')}
                    src={data.popular_video.thumb_url}
                />
                <video
                    muted
                    ref={videoRef}
                    className={cx('video')}
                    src={data.popular_video.file_url}>
                </video>
                <div className={cx('infos')}>
                    <Image className={cx('avatar')} src={data.avatar} />
                    <h5 className={cx('fullname')}>{`${data.first_name} ${data.last_name}`}</h5>
                    <span className={cx('nickname')}>
                        {data.nickname}
                        <span className={cx('check')}><FontAwesomeIcon icon={faCheckCircle} /></span>
                    </span>
                    <Button
                        primary
                        className={cx('btn')}
                        onClick={(e) => {
                            e.preventDefault();
                            context.showModalLogin();
                        }}
                    >
                        Follow
                    </Button>
                </div>
            </div >
        </Link >
    )
}
export default VideoItem;