import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faChevronDown, faCommentDots, faHeart, faMusic, faPause, faPlay, faShare } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';

import styles from "./ListForYou.module.scss"
import Button from "../Button"
import * as Icons from "../Icons"
import { default as PopperWrapper } from '../Popper/Wrapper';
import { itemsOfShare, itemShareMore } from "./ShareItems"

const cx = classNames.bind(styles);

function ListForYou({ data }) {

    const [itemsShare, setItemShare] = useState(itemsOfShare);

    const [isBtnMore, setIsBtnMore] = useState(true);

    const [isLike, setIsLike] = useState(false);

    const [isPlay, setIsPlay] = useState(true);

    const [isVideoSound, setIsVideoSound] = useState(true);

    const [isMuted, setIsMuted] = useState(false);

    const [initVolumeVideo, setInitVolumeVideo] = useState(100);

    const [seekTimesVideo, setSeekTimesVideo] = useState(0);

    const [currentTime, setCurrentTime] = useState('00:00');

    const [videoDuration, setVideoDuration] = useState('00:00');

    const videoRef = useRef();
    const videoPlayRef = useRef();
    const videoControlsRef = useRef();
    const preValueVolume = useRef();
    const progressVolumeRef = useRef();
    const videoProgressRef = useRef();
    const controlsProgressVideoRef = useRef();


    const handleVideoPlay = () => {
        videoRef.current.play();
        videoRef.current.volume = initVolumeVideo / 100;
        setIsPlay(false);

        if (isPlay != true) {
            videoRef.current.pause();
            setIsPlay(true)
        }
    }

    const handleVideoSound = () => {
        if (isVideoSound === false) {

            if (preValueVolume.current) {
                videoRef.current.volume = preValueVolume.current / 100;
                progressVolumeRef.current.style.height = preValueVolume.current + '%';
                setInitVolumeVideo(preValueVolume.current);
            } else {
                videoRef.current.volume = 1;
                setInitVolumeVideo(100);
            }
            setIsVideoSound(true);
            setIsMuted(false);

        } else {
            videoRef.current.volume = 0;
            progressVolumeRef.current.style.height = 0;
            setInitVolumeVideo(0);
            setIsVideoSound(false);
            setIsMuted(true);
        }
    }

    const handleMoreItems = () => {
        setItemShare(prev => [...prev, ...itemShareMore])
        setIsBtnMore(false);
    }

    const handleHidden = () => {
        setItemShare(prev => prev.slice(0, 5));
        setIsBtnMore(true);
    }

    const handleCustomizeVolume = e => {
        videoRef.current.volume = (e.target.value) / 100;
        progressVolumeRef.current.style.height = (e.target.value) + '%';
        preValueVolume.current = e.target.value;
        setInitVolumeVideo(e.target.value);

        if (e.target.value == 0) {
            setIsMuted(true);
            setIsVideoSound(false)
        } else {
            setIsVideoSound(true)
            setIsMuted(false);
        }
    }

    const handleOnPlay = () => {
        setInterval(() => {
            let percentCurrentTime = videoRef.current.currentTime;
            let currentTimeValue = '00:0' + Math.floor(percentCurrentTime);
            if (currentTimeValue.length > 5) {
                currentTimeValue = '00:' + Math.floor(percentCurrentTime);
            }
            setCurrentTime(currentTimeValue);

            // progress video changed
            let progressVideo = Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100);
            videoProgressRef.current.style.width = progressVideo + '%';
            setSeekTimesVideo(progressVideo)


        }, 1000)

        const duration = videoRef.current.duration;
        const totalDuration = '00:' + Math.floor(duration)
        setVideoDuration(totalDuration);

    }



    return (
        <div className={cx("home-item")}>
            <Link to={`/@${data.nickname}`}>
                <img
                    src={data.avatar}
                    alt=""
                    className={cx("avatar")}
                />
            </Link>
            <div className={cx("infos")}>
                <div className={cx('info-header')}>
                    <Tippy
                        delay={[0, 500]}
                        interactive
                        render={(attrs) => (
                            <div tabIndex={-1} {...attrs}>
                                <PopperWrapper>
                                    <div className={cx("preview-account")}>
                                        <div className={cx("avatar-and-btn")}>
                                            <Link to={`/@${data.nickname}`} target="_blank">
                                                <img
                                                    src={data.avatar}
                                                    alt=""
                                                    className={cx("avatar-preview")}
                                                />
                                            </Link>
                                            <Button
                                                outline
                                                className={cx("preview-btn", { isFollowing: data.isFollowing })}
                                            >
                                                {data.isFollowing ? "Following" : "Follow"}
                                            </Button>
                                        </div>
                                        <div className={cx("preview-infos")}>
                                            <h3 className={cx("preview-nickname")}>{data.nickname}</h3>
                                            <p className={cx("preview-fullname")}>{data.full_name}</p>

                                            <div className={cx('preview-follower-and-likes')}>
                                                <strong className={cx("preview-count")}>{data.followers}</strong>
                                                <span className={cx("preview-title")}>Followers</span>
                                                <strong className={cx("preview-count")}>{data.liked_count_total_page}</strong>
                                                <span className={cx("preview-title")}>Likes</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Link to="#">
                            <h3 className={cx("nickname")}>{data.nickname}</h3>
                        </Link>
                    </Tippy>

                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />}
                    <span className={cx("full-name")}>{data.full_name}</span>
                </div>
                <div className={cx('caption-and-hashtag')}>
                    <p className={cx("caption")}>{data.caption}</p>
                    <Link to="#" className={cx("link-hashtag")}>{data.hashtag}</Link>
                </div>
                <div className={cx('music')}>
                    <FontAwesomeIcon icon={faMusic} className={cx("icon-music")} />
                    <Link to="#" className={cx("link-music")}>{data.link_music}</Link>
                </div>
                <div className={cx("video-and-actions")}>
                    <div className={cx('video-wrap')}>
                        <video
                            ref={videoRef}
                            className={cx("video")}
                            // onMouseMove={() => {
                            //     videoPlayRef.current.style.display = "block";
                            //     videoControlsRef.current.style.justifyContent = "space-between";
                            //     controlsProgressVideoRef.current.style.display = "flex";

                            // }}
                            // onMouseOut={() => {
                            //     videoPlayRef.current.style.display = "none";
                            //     videoControlsRef.current.style.justifyContent = "flex-end"
                            //     controlsProgressVideoRef.current.style.display = "none";

                            // }}
                            onPlay={handleOnPlay}
                            onEnded={() => videoRef.current.play()}
                        >
                            <source src={require(`../../assets/videos/${data.video}`)} type="video/mp4" />
                        </video>
                        <div
                            ref={videoPlayRef}
                            className={cx("video-play")}
                            onClick={handleVideoPlay}
                        >
                            <FontAwesomeIcon icon={isPlay ? faPlay : faPause} className={cx("play")} />
                        </div>
                        <Tippy
                            interactive
                            hideOnClick={false}
                            render={(attrs) => (
                                <div className={cx('control-volume')} tabIndex={-1} {...attrs}>
                                    <div className={cx('wrap-customize-volume')}>
                                        <input
                                            value={initVolumeVideo}
                                            className={cx('customize-volume')}
                                            type="range"
                                            onChange={handleCustomizeVolume}
                                        />
                                        <div
                                            ref={progressVolumeRef}
                                            className={cx('progress-volume')}
                                            style={{ height: initVolumeVideo + '%' }}>
                                        </div>
                                    </div>
                                </div>

                            )}
                        >
                            <div
                                className={cx("video-sound")}
                                onClick={handleVideoSound}
                            >
                                {isVideoSound && < Icons.VolumeIcon />}
                                {isMuted && <Icons.MutedIcon />}
                            </div>
                        </Tippy>
                        <div ref={controlsProgressVideoRef} className={cx('controls-progress-video')}>
                            <div className={cx('wrap-video-progress')}>
                                <input
                                    value={seekTimesVideo}
                                    className={cx('video-seek-time')}
                                    type='range'
                                    onChange={e => {
                                        videoProgressRef.current.style.width = e.target.value + '%';
                                        setSeekTimesVideo(e.target.value);
                                        // handle when seek
                                        const seekTime = (videoRef.current.duration / 100) * e.target.value;
                                        videoRef.current.currentTime = seekTime;
                                    }}
                                />
                                <div ref={videoProgressRef} className={cx('video-progress')}></div>
                            </div>
                            <div className={cx('times-video')}>
                                <span className={cx('current-time-video')}>{currentTime}/</span>
                                <span className={cx('duration-video')}>{videoDuration}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("actions")}>
                        <button
                            className={cx("btn-like", "btn", { isLikeActive: isLike })}
                            onClick={() => setIsLike(!isLike)}
                        >
                            <span className={cx("wrap-icon")} >
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </span>
                            <p className={cx('counts-like', 'counts')}>{data.liked_count_post}</p>
                        </button>
                        <button className={cx("btn-comment", "btn")}>
                            <span className={cx("wrap-icon")}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </span>
                            <p className={cx('counts-comment', 'counts')}>{data.comment_count_post}</p>
                        </button>
                        <Tippy
                            onHidden={handleHidden}
                            interactive
                            delay={[0, 500]}
                            placement="top"
                            offset={[90, 10]}
                            render={(attrs) => (
                                <div tabIndex={-1} {...attrs}>
                                    <PopperWrapper className={cx("custom-popper")}>
                                        <div className={cx("list-item-share")}>
                                            {itemsShare.map((item, index) => (
                                                <Button
                                                    href="#"
                                                    key={index}
                                                    children={item.title}
                                                    leftIcon={item.icon}
                                                    className={cx("popper-btn-share")}
                                                />
                                            ))}
                                            {isBtnMore &&
                                                <Button
                                                    children={<FontAwesomeIcon icon={faChevronDown} />}
                                                    className={cx("btn-more")}
                                                    onClick={handleMoreItems}
                                                />}

                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <button className={cx("btn-share", "btn")}>
                                <span className={cx("wrap-icon")}>
                                    <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                                </span>
                                <p className={cx('counts-share', 'counts')}>{data.share_count_post}</p>
                            </button>
                        </Tippy>

                    </div>
                </div>
            </div >
            <Button
                outline
                className={cx("btn-follow", { isFollowing: data.isFollowing })}
            >
                {data.isFollowing ? "Following" : "Follow"}
            </Button>
        </div >
    );
}

ListForYou.propTypes = {
    data: PropTypes.object.isRequired
}


export default ListForYou;