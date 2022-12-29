import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import ListForYou from "../../Components/ListForYou";
import * as forYouService from "../../services/forYouService";

const cx = classNames.bind(styles);

function Home() {

    const [foryou, setForyou] = useState([]);
    const [page, setPage] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const [isSound, setIsSound] = useState(false);
    const [initVolume, setInitVolume] = useState(0);
    const [progressVolume, setProgressVolume] = useState(0);
    const [prevVolume, setPrevVolume] = useState(0);


    const handleToggleMuted = () => {
        if (isMuted) {
            setIsMuted(false);
            setIsSound(true);
            prevVolume ? setInitVolume(prevVolume) : setInitVolume(100);
            prevVolume ? setProgressVolume(prevVolume) : setProgressVolume(100)
        } else {
            setIsMuted(true);
            setIsSound(false);
            setInitVolume(0);

            setProgressVolume(0)
        }
    }

    const handleAdjustVolume = (e) => {
        if (e.target.value == 0) {
            setIsMuted(true);
            setIsSound(false);
            setInitVolume(e.target.value);
            setProgressVolume(e.target.value);
        } else {
            setInitVolume(e.target.value);
            setProgressVolume(e.target.value);
            setIsMuted(false);
            setIsSound(true);
        }
        setPrevVolume(e.target.value);
    }


    useEffect(() => {
        (async () => {
            const result = await forYouService.loadForYou('for-you', page);
            if (result) {
                setForyou(prev => [...prev, ...result])
            }
        })()
    }, [page])


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
                setPage(page => page + 1);
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])


    return (
        <div className={cx("home-list")}>
            {foryou.map((data, index) => (
                <ListForYou
                    key={index}
                    data={data}
                    isSound={isSound}
                    isMuted={isMuted}
                    initVolume={initVolume}
                    prevVolume={prevVolume}
                    progressVolume={progressVolume}
                    handleAdjustVolume={handleAdjustVolume}
                    handleToggleMuted={handleToggleMuted}
                />
            ))}
        </div>
    )
}
export default Home;