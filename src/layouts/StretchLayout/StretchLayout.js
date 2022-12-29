import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import Header from "../Header"
import Slidebar from "../Slidebar"
import styles from "./StretchLayout.module.scss";
import GetApps from "../../Components/GetApps"
import GoToTop from '../../Components/GoToTop';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);


function LayoutDefault({ children }) {

    const [isBtnGoToTop, setBtnGoToTop] = useState(false);
    const actionRef = useRef();

    // handle window scroll hide/show btn goto top
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setBtnGoToTop(true);
            } else {
                actionRef.current.animate([{ bottom: '10px' },], { duration: 300 });
                setTimeout(() => setBtnGoToTop(false), 280);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isBtnGoToTop])


    const handleGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className={cx("wrapper")}>
            <Header stretch />
            <div className={cx("container")}>
                <Slidebar shrink />
                <div className={cx("content")}>
                    {children}
                </div>
                <div ref={actionRef} className={cx('actions', { 'isBtnGoToTop': isBtnGoToTop })}>
                    <GetApps />
                    <GoToTop onClick={handleGoToTop} />
                </div>
            </div>
        </div>
    )
}

LayoutDefault.propTypes = {
    children: PropTypes.node.isRequired
}
export default LayoutDefault;