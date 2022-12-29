import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCommentDots, faHeart, faMusic, faPause, faPlay, faShare } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from "./ListForYou.module.scss"
import Button from "../Button"
import * as Icons from "../Icons"
import { default as PopperWrapper } from '../Popper/Wrapper';
import ItemsShare from '../ItemsShare';
import Image from '../Image/Image';
import { ModalContext } from '../ModalProvider';


const cx = classNames.bind(styles);

function ListForYou({
    data,
    isMuted,
    isSound,
    initVolume,
    prevVolume,
    progressVolume,
    handleToggleMuted,
    handleAdjustVolume, }) {

    const [isLike, setIsLike] = useState(false);
    const [isPlay, setIsPlay] = useState(true);
    const [seekTimesVideo, setSeekTimesVideo] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [videoDuration, setVideoDuration] = useState('00:00');
    const [isShowControlsProgressVideo, setIsShowControlsProgressVideo] = useState(false);

    const videoRef = useRef();
    const videoProgressRef = useRef();
    const currentTimeId = useRef();

    const context = useContext(ModalContext);
    const userLogin = false;


    //handle window scroll
    useEffect(() => {
        const handleScrollPlayOrPauseVideo = () => {
            const bounding = videoRef.current.getBoundingClientRect();
            if (bounding) {
                if (bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                    if (isMuted) {
                        videoRef.current.volume = 0;
                        setIsPlay(false);
                    }
                    else {
                        videoRef.current.volume = prevVolume ? prevVolume / 100 : 1;
                        setIsPlay(false)
                    }
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                    setIsPlay(true);
                    clearInterval(currentTimeId.current);
                }
            }
        }
        window.addEventListener("scroll", handleScrollPlayOrPauseVideo)
        return () => window.removeEventListener("scroll", handleScrollPlayOrPauseVideo)
    }, [isPlay])


    // handle onplay video 
    useEffect(() => {
        videoRef.current.onplay = () => {
            currentTimeId.current = setInterval(() => {
                let percentCurrentTime = videoRef.current.currentTime;
                let currentTimeValue = '00:0' + Math.floor(percentCurrentTime);
                setCurrentTime(currentTimeValue);

                if (currentTimeValue.length > 5) {
                    currentTimeValue = '00:' + Math.floor(percentCurrentTime);
                }
                // progress video changed
                let progressVideo = Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100);
                videoProgressRef.current.style.width = progressVideo + '%';
                setSeekTimesVideo(progressVideo);

            }, 1000)

            const duration = videoRef.current.duration;
            const totalDuration = '00:' + Math.floor(duration)
            setVideoDuration(totalDuration);

            // handle video duration >= 30 show controls progress 
            if (Math.floor(duration) >= 30) {
                setIsShowControlsProgressVideo(true)
            }
        }
        return () => clearInterval(currentTimeId.current);
    }, [])

    const handleVideoPlay = () => {
        videoRef.current.play();
        videoRef.current.volume = initVolume / 100;
        setIsPlay(false);

        if (isPlay !== true) {
            clearInterval(currentTimeId.current)
            videoRef.current.pause();
            setIsPlay(true)
        }
    }

    const handleVideoSound = () => {
        if (isMuted) {
            videoRef.current.volume = prevVolume ? prevVolume / 100 : 1;
        } else {
            videoRef.current.volume = 0;
        }
        handleToggleMuted();
    }



    const handleCustomizeVolume = (e) => {
        if (e.target.value == 0) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = initVolume / 100;
        }

        handleAdjustVolume(e);
    }

    return (
        <div className={cx("home-item")}>
            <Link to={`/@${data.user.nickname}`} state={data.user}>
                <Image
                    src={data.user.avatar}
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
                                            <Link to={`/@${data.user.nickname}`} state={data.user} target="_blank" >
                                                <Image
                                                    src={data.user.avatar}
                                                    alt=""
                                                    className={cx("avatar-preview")}
                                                />
                                            </Link>
                                            <Button
                                                outline
                                                className={cx("preview-btn", {
                                                    isFollowing: data.user.is_followed
                                                })}
                                                onClick={() => context.showModalLogin()}

                                            >
                                                {data.user.is_followed ? "Following" : "Follow"}
                                            </Button>
                                        </div>
                                        <div className={cx("preview-infos")}>
                                            <h3 className={cx("preview-nickname")}>{data.user.nickname}</h3>
                                            <p className={cx("preview-fullname")}>{`${data.user.first_name} ${data.user.last_name}`}</p>

                                            <div className={cx('preview-follower-and-likes')}>
                                                <strong className={cx("preview-count")}>{data.user.followers_count}</strong>
                                                <span className={cx("preview-title")}>Followers</span>
                                                <strong className={cx("preview-count")}>{data.user.likes_count}</strong>
                                                <span className={cx("preview-title")}>Likes</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Link to={`/@${data.user.nickname}`} state={data.user}>
                            <h3 className={cx("nickname")}>{data.user.nickname}</h3>
                        </Link>
                    </Tippy>

                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx("check")} />}
                    <span className={cx("full-name")}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                </div>
                <div className={cx('caption-and-hashtag')}>
                    <p className={cx("caption")}>{data.description}</p>
                    {/* <Link to="#" className={cx("link-hashtag")}>fsdsdf</Link> */}
                </div>
                <div className={cx('music')}>
                    <FontAwesomeIcon icon={faMusic} className={cx("icon-music")} />
                    <Link to="#" className={cx("link-music")}>{data.music}</Link>
                </div>
                <div className={cx("video-and-actions")}>
                    <div
                        className={cx('video-wrap', { isMuted: isMuted })}
                    >
                        <Link
                            to={`/@${data.user.nickname}/video/${data.id}`}
                            state={{
                                id: data.id,
                                nickname: data.user?.nickname,
                            }}>
                            <video
                                ref={videoRef}
                                style={data.meta.video.resolution_x < data.meta.video.resolution_y ? { width: '281px' } : { width: '463px' }}
                                className={cx("video")}
                                onEnded={() => {
                                    clearInterval(currentTimeId.current);
                                    videoRef.current.play();
                                }}
                            >
                                <source src={data.file_url} type="video/mp4" />
                            </video>
                        </Link>
                        <div
                            className={cx("video-play")}
                            onClick={handleVideoPlay}
                        >
                            <FontAwesomeIcon icon={isPlay ? faPlay : faPause} className={cx("play")} />
                        </div>
                        <Tippy
                            interactive
                            hideOnClick={false}
                            placement="top"
                            render={(attrs) => (
                                <div className={cx('control-volume')} tabIndex={-1} {...attrs}>
                                    <div className={cx('wrap-customize-volume')}>
                                        <input
                                            value={initVolume}
                                            className={cx('customize-volume')}
                                            type="range"
                                            onChange={handleCustomizeVolume}
                                        />
                                        <div
                                            className={cx('progress-volume')}
                                            style={{ height: progressVolume + '%' }}
                                        >
                                        </div>
                                    </div>
                                </div>

                            )}
                        >
                            <div className={cx("video-sound")} onClick={handleVideoSound}
                            >
                                {isSound && < Icons.VolumeIcon />}
                                {isMuted && <Icons.MutedIcon />}
                            </div>
                        </Tippy>
                        <div className={cx('controls-progress-video', { isShowControlsProgressVideo: isShowControlsProgressVideo })}  >
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
                            onClick={() => userLogin ? setIsLike(!isLike) : context.showModalLogin()}
                        >
                            <span className={cx("wrap-icon")}>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </span>
                            <p className={cx('counts-like', 'counts')}>{data.likes_count}</p>
                        </button>
                        <button
                            className={cx("btn-comment", "btn")}
                            onClick={() => userLogin ? context.showComment() : context.showModalLogin()}
                        >
                            <span className={cx("wrap-icon")}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </span>
                            <p className={cx('counts-comment', 'counts')}>{data.comments_count}</p>
                        </button>

                        <ItemsShare offset={[90, 10]}>
                            <button className={cx("btn-share", "btn")}>
                                <span className={cx("wrap-icon")}>
                                    <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                                </span>
                                <p className={cx('counts-share', 'counts')}>{data.shares_count}</p>
                            </button>
                        </ItemsShare>

                    </div>
                </div>
            </div >
            <Button
                outline
                className={cx("btn-follow", { isFollowing: data.user.is_followed })}
                onClick={() => context.showModalLogin()}
            >
                {data.user.is_followed ? "Following" : "Follow"}
            </Button>

        </div >
    );
}

ListForYou.propTypes = {
    data: PropTypes.object.isRequired,
    isMuted: PropTypes.bool.isRequired,
    isSound: PropTypes.bool.isRequired,
    initVolume: PropTypes.node.isRequired,
    prevVolume: PropTypes.node.isRequired,
    progressVolume: PropTypes.node.isRequired,
    handleAdjustVolume: PropTypes.func.isRequired,
    handleToggleMuted: PropTypes.func.isRequired
}

export default ListForYou;