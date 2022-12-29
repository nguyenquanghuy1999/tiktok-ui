import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react/headless";
import {
    faCheckCircle,
    faChevronDown,
    faCommentDots,
    faHeart,
    faMusic,
    faPlay
} from "@fortawesome/free-solid-svg-icons";

import style from './Comment.module.scss';
import * as Icons from '../../Components/Icons';
import AccountPreview from "../../Components/AccountPreview";
import Button from "../../Components/Button";
import { ModalContext } from "../../Components/ModalProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalLogin from "../../Components/ModalLogin/ModalLogin";
import { default as PopperWrapper } from '../../Components/Popper'
import Image from "../../Components/Image";
import * as  userService from "../../services/userService";

const cx = classNames.bind(style);

const shareItems = [
    {
        icon: <Icons.LinkedlnIcon />,
        title: 'Share to Linkedln'
    },
    {
        icon: <Icons.RedditIcon />,
        title: 'Share to Reddit'
    },
    {
        icon: <Icons.TelegramIcon />,
        title: 'Share to Telegram'
    },
    {
        icon: <Icons.EmailIcon />,
        title: 'Share to Email'
    },
    {
        icon: <Icons.LineIcon />,
        title: 'Share to Line'
    },
    {
        icon: <Icons.PinterestIcon />,
        title: 'Share to Pinterest'
    },

]

function Comment() {

    const navigate = useNavigate();

    const userData = useLocation();
    const nickname = userData.state.nickname;
    const videoId = userData.state.id;

    const userLogin = false;
    const context = useContext(ModalContext);
    const [isPause, setIsPause] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [videoDuration, setVideoDuration] = useState('00:00');
    const [seekTimes, setSeekTimes] = useState(0);
    const [initVolume, setInitVolume] = useState(0);
    const [isSound, setIsSound] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [video, setVideo] = useState();
    const [user, setUser] = useState();



    const videoRef = useRef();
    const currentTimeId = useRef();
    const progressVolumeRef = useRef();
    const videoProgressRef = useRef();


    const playVideo = () => videoRef.current.play();
    const pauseVideo = () => videoRef.current.pause();


    // call api user
    useEffect(() => {
        (async () => {
            const data = await userService.loadUser(nickname);
            if (data) {
                setUser(data);
                return data.videos.find(video => {
                    if (video.id === videoId) {
                        setVideo(video);
                    }
                })
            }
        })()
    }, [])


    // handle when press keyboard
    useEffect(() => {
        let isSpace = false;
        const handleKey = e => {
            if (isSpace && e.key === ' ') {
                playVideo();
                setIsPause(false);
                isSpace = false;
            } else if (isPause === false && e.key === ' ') {
                pauseVideo()
                setIsPause(true);
                isSpace = true;
            }

            if (e.key === "Escape") {
                navigate(-1);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [])



    // handle listend onplay
    useEffect(() => {
        // volume default when video play
        videoRef.current.volume = 0;

        videoRef.current.onplay = () => {
            // current time change
            currentTimeId.current = setInterval(() => {
                let percentCurrentTime = videoRef.current.currentTime;
                let currentTimeValue = '00:0' + Math.floor(percentCurrentTime);
                if (currentTimeValue.length > 5) {
                    currentTimeValue = '00:' + Math.floor(percentCurrentTime);
                }
                setCurrentTime(currentTimeValue);

                // progress video changed
                let progressVideo = Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100);
                videoProgressRef.current.style.width = progressVideo + '%';
                setSeekTimes(progressVideo);

            }, 1000)

            // show duration when video play
            const duration = videoRef.current.duration;
            const totalDuration = '00:' + Math.floor(duration);
            setVideoDuration(totalDuration);
        }
        return () => clearInterval(currentTimeId.current);
    }, []);



    const handleTogglePlayAndPause = () => {
        if (isPause) {
            playVideo();
            setIsPause(false);
        } else {
            pauseVideo();
            setIsPause(true);

        }
    }

    const handleCustomizeVolume = (e) => {
        if (e.target.value == 0) {
            setIsMuted(true);
            setIsSound(false);
        } else {
            setIsMuted(false);
            setIsSound(true);
        }
        videoRef.current.volume = e.target.value / 100;
        progressVolumeRef.current.style.height = e.target.value + '%';
        setInitVolume(e.target.value);
    }

    const handleClickSound = () => {
        videoRef.current.volume = 0;
        progressVolumeRef.current.height = 0;
        setInitVolume(0);
        setIsSound(false);
        setIsMuted(true);
    };

    const handleClickMuted = () => {
        videoRef.current.volume = 1;
        progressVolumeRef.current.height = initVolume + '%';
        setInitVolume(100);
        setIsSound(true);
        setIsMuted(false);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content-left')}>
                    <img src={video?.thumb_url} />
                    <div
                        className={cx('video-wrap')}
                        onClick={handleTogglePlayAndPause}
                    >
                        <video
                            autoPlay
                            ref={videoRef}
                            src={video?.file_url}
                            width={662}
                            height={625}
                            onEnded={() => playVideo()}
                            onPause={() => clearInterval(currentTimeId.current)}
                        >
                        </video>
                        <div className={cx('controls-progress-video')}  >
                            <div className={cx('wrap-video-progress')} onClick={e => e.stopPropagation()}>
                                <input
                                    value={seekTimes}
                                    className={cx('video-seek-time')}
                                    type='range'
                                    onChange={e => {
                                        const seekTime = (videoRef.current.duration / 100) * e.target.value;
                                        videoRef.current.currentTime = seekTime;
                                    }}
                                />
                                <div ref={videoProgressRef} className={cx('video-progress')}> </div>
                            </div>
                            <div className={cx('times-video')}>
                                <span className={cx('current-time-video')}>{currentTime}/</span>
                                <span className={cx('duration-video')}>{videoDuration}</span>
                            </div>
                        </div>
                        {isPause && (
                            <div className={cx('icon-play-large')}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        )}
                    </div>
                    <div className={cx('actions-content-left')}>
                        <div className={cx('arrow-top-btn', 'btn')}>
                            <Icons.ArrowTopIcon className={cx('icon')} />
                        </div>
                        <div className={cx('arrow-bottom-btn', 'btn')}>
                            <Icons.ArrowBottomIcon className={cx('icon')} />
                        </div>
                        <Tippy
                            interactive
                            hideOnClick={false}
                            render={(props) => (
                                <div className={cx('control-volume')} tabIndex={-1} {...props}>
                                    <div className={cx('wrap-customize-volume')}>
                                        <input
                                            value={initVolume}
                                            className={cx('customize-volume')}
                                            type="range"
                                            onChange={handleCustomizeVolume}
                                        />
                                        <div
                                            ref={progressVolumeRef}
                                            className={cx('progress-volume')}
                                            style={{ height: initVolume + '%' }}>
                                        </div>
                                    </div>
                                </div>
                            )}>
                            <div className={cx('volume')}>
                                {isSound && (
                                    <div className={cx('btn')} onClick={handleClickSound} >
                                        <Icons.VolumeIcon />
                                    </div>
                                )}
                                {isMuted && (
                                    <div className={cx('btn')} onClick={handleClickMuted} >
                                        <Icons.MutedIcon />
                                    </div>
                                )}
                            </div>
                        </Tippy>
                    </div>
                    <div className={cx('btn-close', 'btn')} onClick={() => navigate(-1)}>
                        <Icons.CloseIcon />
                    </div>
                    <span className={cx('tiktok-icon')}><Icons.TikTokIcon /></span>
                    <div className={cx('report')}>
                        <FontAwesomeIcon icon={faFlag} className={cx('flag-icon')} />
                        <span className={cx('title')}>Report</span>
                    </div>
                </div>

                <div className={cx('content-right')}>
                    <div className={cx('inner-content-right')}>
                        <div className={cx('infos')}>
                            <Link to={`/@${user?.nickname}`} className={cx('infos-header')}>
                                <Image
                                    className={cx('avatar')}
                                    src={user?.avatar}
                                    width={100}
                                    height={100}
                                />
                                <div className={cx('name-header')} >
                                    <Tippy
                                        interactive
                                        render={() => <AccountPreview data={user} btnOutline />}
                                    >
                                        <span className={cx('nickname')}>{user?.nickname}</span>
                                    </Tippy>
                                    <span className={cx('check')}><FontAwesomeIcon icon={faCheckCircle} /></span>
                                    <div className={cx('name-bottom')}>
                                        <span className={cx('fullname')}>{`${user?.first_name} ${user?.last_name}`}</span>
                                        <span className={cx('times-post')}>3d ago</span>
                                    </div>
                                </div>
                            </Link>
                            <Button
                                outline
                                className={cx('following-btn')}
                                onClick={() => context.showModalLogin()}
                            >
                                Follow
                            </Button>
                        </div>
                        <p className={cx('caption')}>{video?.description}</p>
                        <div className={cx('music')}>
                            <FontAwesomeIcon icon={faMusic} />
                            <a href="#" className={cx('music-title')}>{video?.music}</a>
                        </div>

                        <div className={cx('actions-content-right')}>
                            <div className={cx('action-left')}>
                                <span className={cx('like-icon')}><FontAwesomeIcon icon={faHeart} /></span>
                                <span className={cx('like-count')}>{video?.likes_count}</span>
                                <span className={cx('comment-icon')}><FontAwesomeIcon icon={faCommentDots} /></span>
                                <span className={cx('comment-count')}>{video?.comments_count}</span>
                            </div>
                            <ul className={cx('action-right')}>
                                <li className={cx('action-right-item')}><Icons.EmbedIcon width='2.4rem' height='2.4rem' /></li>
                                <li className={cx('action-right-item')}><Icons.SendToIcon width='2.4rem' height='2.4rem' /></li>
                                <li className={cx('action-right-item')}><Icons.FbIcon width='2.4rem' height='2.4rem' /></li>
                                <li className={cx('action-right-item')}><Icons.WhatsAppIcon width='2.4rem' height='2.4rem' /></li>
                                <li className={cx('action-right-item')}><Icons.TwitterCircleIcon width='2.4rem' height='2.4rem' /></li>
                                <Tippy
                                    interactive
                                    placement="bottom"
                                    offset={[-120, 15]}
                                    delay={[50, 300]}
                                    render={(attrs) => (
                                        <div className={cx('sub-items')} tabIndex={-1} {...attrs}>
                                            <PopperWrapper>
                                                <ul className={cx('list-share')}>
                                                    {shareItems.map((item, index) => (
                                                        <li key={index} className={cx('share-item')}>
                                                            <span className={cx('share-item-icon')}>{item.icon}</span>
                                                            <span className={cx('share-item-title')}>{item.title}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </PopperWrapper>
                                        </div>
                                    )}>
                                    <li className={cx('action-right-item', 'arrow-right')} ><Icons.ArrowRightCircleIcon /></li>
                                </Tippy>
                            </ul>
                        </div>

                        <div className={cx('copy-link')}>
                            <div className={cx('coppy-link-inner')}>
                                <span className={cx('text-link')}>{`http://localhost:3000/@${nickname}/video/${videoId}`}</span>
                                <button className={cx('btn-copy-link')}>Copy link</button>
                            </div>
                        </div>

                        <div className={cx('user-comments')}>
                            <div className={cx('user-item')}>
                                <div className={cx('user-infos')}>
                                    <img
                                        className={cx('avatar-user')}
                                        src="https://top5kythu.com/wp-content/uploads/Rose-blackpink-1.png"
                                        width={20}
                                        height={20}
                                    />
                                    <div className={cx('user-content')}>
                                        <span className={cx('username')}>Louis•💞</span>
                                        <p className={cx('comment-text')}>so cute</p>
                                        <div className={cx('user-sub-content')}>
                                            <span className={cx('comment-time')}>3d ago</span>
                                            <span className={cx('comment-reply')}>Reply</span>
                                        </div>
                                    </div>
                                    <div className={cx('like-comment')}>
                                        <Icons.HeartIcon />
                                        <span className={cx('like-comment-count')}>1891</span>
                                    </div>
                                    <div className={cx('dots-comment')}><Icons.DotsIcon /></div>
                                </div>
                                <div className={cx('view-more-replies')}>
                                    <span className={cx('count-replies')}>View more replies (2)</span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                            <div className={cx('user-item')}>
                                <div className={cx('user-infos')}>
                                    <img
                                        className={cx('avatar-user')}
                                        src="https://media-cdn-v2.laodong.vn/storage/newsportal/2022/2/28/1018487/Rose-Blackpink-Sinh-.jpeg"
                                        width={20}
                                        height={20}
                                    />
                                    <div className={cx('user-content')}>
                                        <span className={cx('username')}>Sườn chua ngọtttt ✨🪐</span>
                                        <p className={cx('comment-text')}>Sa rang hê vợ yêu</p>
                                        <div className={cx('user-sub-content')}>
                                            <span className={cx('comment-time')}>3d ago</span>
                                            <span className={cx('comment-reply')}>Reply</span>
                                        </div>
                                    </div>
                                    <div className={cx('like-comment')}>
                                        <Icons.HeartIcon />
                                        <span className={cx('like-comment-count')}>2342</span>
                                    </div>
                                    <div className={cx('dots-comment')}><Icons.DotsIcon /></div>
                                </div>
                                <div className={cx('view-more-replies')}>
                                    <span className={cx('count-replies')}>View more replies (2)</span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                        </div>
                        {userLogin ? (
                            <div className={cx('wrap-add-comment')}>
                                <div className={cx('add-comment')}>
                                    <input className={cx('input-add-comment')} placeholder="Add comment..." />
                                    <div className={cx('comment-tag')}><Icons.TagIcon /></div>
                                    <div className={cx('enmojis-comment')}><Icons.EnmojisIcon /></div>
                                </div>
                                <span className={cx('post-comment')}>Post</span>
                            </div>
                        ) : (
                            <div className={cx('login-to-comment')} onClick={() => context.showModalLogin()}>
                                <span className={cx('login-to-comment-text')}>
                                    Please log in to comment
                                </span>
                            </div>
                        )
                        }
                    </div>
                </div>

            </div >
            {context.isModalLogin && <ModalLogin />}
        </div >
    )
}
export default Comment;