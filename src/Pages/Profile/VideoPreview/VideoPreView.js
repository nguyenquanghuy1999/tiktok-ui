import classNames from "classnames/bind";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./VideoPreview.module.scss";

const cx = classNames.bind(styles);

function VideoPreview({ data }) {
    const videoRef = useRef();

    return (
        <div className={cx('video-item')}
            onMouseMove={() => {
                videoRef.current.play();
                videoRef.current.volume = 0;
            }}
            onMouseOut={() => {
                videoRef.current.pause();
            }}
        >
            <Link
                to={`/@${data.user.nickname}/video/${data.id}`}
                state={{
                    id: data.id,
                    nickname: data.user.nickname
                }}
            >
                <video ref={videoRef} width='100%' >
                    <source src={data?.file_url} />
                </video>
            </Link>
            <div className={cx('preview-wrap')}>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                        clipRule="evenodd" d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z">
                    </path>
                </svg>
                <span className={cx('preview-liked')}>{data?.likes_count}</span>
            </div>
        </div>


    )

}
export default VideoPreview;