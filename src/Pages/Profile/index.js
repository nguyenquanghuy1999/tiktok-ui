import { faCheckCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "../../Components/Button";
import ItemsShare from "../../Components/ItemsShare";
import style from './Profile.module.scss';
import { default as PopperWrapper } from "../../Components/Popper/Wrapper";
import VideoPreview from "./VideoPreview/VideoPreView";
import * as Icons from '../../Components/Icons';
import noImge from '../../assets/images/no-image.png';
import ModalLogin from "../../Components/ModalLogin/ModalLogin";
import { ModalContext } from "../../Components/ModalProvider";

const cx = classNames.bind(style);

function Profile() {

    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState();
    const [isLikedActive, setIsLikedActive] = useState(false);
    const [isVideosdActive, setVideosActive] = useState(true);
    const context = useContext(ModalContext);


    const lineRef = useRef();
    const location = useLocation();
    const data = location.state;


    useEffect(() => {
        if (data) {
            fetch(`https://tiktok.fullstack.edu.vn/api/users/@${data?.nickname}`)
                .then(res => res.json())
                .then(res => setVideos(res.data?.videos))
        } else {
            fetch(`https://tiktok.fullstack.edu.vn/api/users${location.pathname}`)
                .then(res => res.json())
                .then(res => {
                    setUser(res.data);
                    setVideos(res.data.videos)
                })
        }
    }, [data])

    const handleMouseOut = () => {
        if (lineRef.current) {
            const options = { duration: 200, fill: 'forwards' };
            if (isLikedActive) {
                const keyframes = [{ transform: 'translateX(230px)' }];
                lineRef.current.animate(keyframes, options);
            } else {
                const keyframes = [{ transform: 'translateX(0px)' }];
                lineRef.current.animate(keyframes, options)
            }
        }
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('infos')}>
                <div className={cx('info-header')}>
                    <img
                        alt={data?.nickname}
                        className={cx('avatar')}
                        src={data?.avatar || user?.avatar}
                        onError={e => e.target.src = noImge}
                    />
                    <div className={cx('name-user')}>
                        <h2 className={cx('nickname')}>
                            {data?.nickname || user?.nickname}
                            <span className={cx('check')}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </span>
                        </h2>
                        {

                        }
                        <span className={cx('full-name')}>{`${data?.first_name || user?.first_name} ${data?.last_name || user?.last_name}`}</span>
                        <Button
                            primary
                            className={cx('btn-follow')}
                            onClick={() => context.showModalLogin()}
                        >
                            Follow</Button>
                    </div>
                    <div className={cx('actions')}>
                        <ItemsShare offset={[-100, 10]}>
                            <div className={cx('shares')}><Icons.ArrowRightIcon /></div>
                        </ItemsShare>
                        <Tippy
                            interactive
                            delay={[0, 300]}
                            placement='bottom'
                            offset={[-80, 10]}
                            render={(props) => (
                                <div tabIndex={-1} {...props}>
                                    <PopperWrapper className={cx('custom-popper')}>
                                        <div className={cx('option-list')}>
                                            <Button className={cx('option-item')} leftIcon={<Icons.SendIconSmall />}>
                                                Send message
                                            </Button>
                                            <Button className={cx('option-item')} leftIcon={<Icons.RepostIcon />}>
                                                Repost
                                            </Button>
                                            <Button className={cx('option-item')} leftIcon={<Icons.BlockIcon />}>
                                                Block
                                            </Button>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('options')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </Tippy>
                    </div>
                </div>
                <div className={cx('info-body')}>
                    <div className={cx('counts-info')}>
                        <strong className={cx('counts')}>{data?.followings_count || user?.followings_count}</strong>
                        <span className={cx('count-title')}>Following</span>
                        <strong className={cx('counts')}>{data?.followers_count || user?.followers_count}</strong>
                        <span className={cx('count-title')}>Follower</span>
                        <strong className={cx('counts')}>{data?.likes_count || user?.likes_count}</strong>
                        <span className={cx('count-title')}>Likes</span>
                    </div>
                    <div className={cx('descripts')}>
                        <p className={cx('bio')}> {data?.bio || user?.bio}</p>
                        {/* <p className={cx('contact')}>Booking: Talents@senvangvn.com </p> */}
                    </div>
                </div>


            </div>
            <div className={cx('video-and-liked')}>
                <p
                    className={cx('videos-title', { isVideosdActive: isVideosdActive })}
                    onClick={() => {
                        if (lineRef.current) {
                            lineRef.current.animate([
                                { transform: 'translateX(0px)' }
                            ], { duration: 200, fill: 'forwards' })
                        }
                        setVideosActive(true);
                        setIsLikedActive(false);
                    }}
                    onMouseMove={() => {
                        if (lineRef.current) {
                            lineRef.current.animate([
                                { transform: 'translateX(0px)' }
                            ], { duration: 200, fill: 'forwards' })
                        }
                    }}
                    onMouseOut={handleMouseOut}
                >
                    Videos
                </p>
                <p
                    className={cx('liked-title', { isLikedActive: isLikedActive })}
                    onMouseMove={() => {
                        if (lineRef.current) {
                            lineRef.current.animate([
                                { transform: 'translateX(230px)' }
                            ], { duration: 200, fill: 'forwards' })
                        }
                    }}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                        setIsLikedActive(true);
                        setVideosActive(false);
                    }}
                >
                    <span className={cx('icon-lock')}><Icons.LockIconSmall /></span>
                    Liked
                </p>
            </div>
            <div className={cx('tab')}>
                <div ref={lineRef} className={cx('line')}>
                </div>
            </div>
            <div className={cx('videos-wrap', { isLikedActive: isLikedActive })}>
                <div className={cx('video-list')}>
                    {videos.map((data) => <VideoPreview key={data.id} data={data} />)}
                </div>
            </div>

            <div className={cx('private-wrap', { isLikedActive: isLikedActive })}>
                <div className={cx('private-inner')}>
                    <Icons.LockIconLarge />
                    <p className={cx('private-content')}>This user's liked videos are private</p>
                    <p className={cx('private-descript')}>Videos liked by phun.anh are currently hidden</p>
                </div>
            </div>

            { context.isModalLogin && <ModalLogin /> }

        </div >
    )
}
export default Profile;