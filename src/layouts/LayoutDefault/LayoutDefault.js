import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import Header from "../Header"
import Slidebar from "../Slidebar"
import styles from "./LayoutDefault.module.scss";
import GetApps from "../../Components/GetApps"
import GoToTop from '../../Components/GoToTop';
import ModalLogin from '../../Components/ModalLogin/ModalLogin';
import { ModalContext } from '../../Components/ModalProvider';


const cx = classNames.bind(styles);

function LayoutDefault({ children }) {

    const context = useContext(ModalContext);

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
            <Header />
            <div className={cx("container")}>
                <Slidebar />
                <div className={cx("content")}>
                    {children}
                </div>
                <div ref={actionRef} className={cx('actions', { 'isBtnGoToTop': isBtnGoToTop })}>
                    <GetApps />
                    <GoToTop onClick={handleGoToTop} />
                </div>
            </div>
            {context.isModalLogin && <ModalLogin />}
        </div>
    )
}

LayoutDefault.propTypes = {
    children: PropTypes.node.isRequired
}
export default LayoutDefault;