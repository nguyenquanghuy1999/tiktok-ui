import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

import style from './ModalLogin.module.scss';
import * as Icons from '../Icons';
import { ModalContext } from "../ModalProvider";
import { items, months } from "./Components";

const cx = classNames.bind(style);

function ModalLogin() {

    const context = useContext(ModalContext);

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoginPhoneOrEmail, setIsLoginPhoneOrEmail] = useState(false);
    const [isSignUpPhoneOrEmail, setIsSignUpPhoneOrEmail] = useState(false);
    const [isMoreItem, setIsMoreItem] = useState(false);
    const [isLoginEmail, setIsLoginEmail] = useState(false);
    const [isSignUpEmail, setIsSignUpEmail] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isBtnActive, setIsBtnActive] = useState(false);
    const [isBirthdayMonth, setIsBirthdayMonth] = useState(false);
    const [isBirthdayDay, setIsBirthdayDay] = useState(false);
    const [isBirthdayYear, setIsBirthdayYear] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const inputPassRef = useRef();
    const inputPassConfirmRef = useRef();
    const innerRef = useRef();
    const birthdayMonthRef = useRef();


    useEffect(() => {
        if (isLoginPhoneOrEmail) {
            if (email != '' && password != '') {
                setIsBtnActive(true);
            } else {
                setIsBtnActive(false);
            }
        }

        if (isSignUpPhoneOrEmail) {
            if (email != '' && password != '' && confirmPassword != '') {
                setIsBtnActive(true);
            } else {
                setIsBtnActive(false);
            }
        }

    }, [email, password, confirmPassword])


    const handleCloseBtn = () => {
        const keyframes = [{ transform: 'scale(0)', opacity: 0 }];
        const options = { duration: 200, fill: 'forwards' };
        innerRef.current.animate(keyframes, options);
        setTimeout(() => context.hideModalLogin(), 200)
    }

    const handleItemLoginPhoneOrEmail = (index) => {
        if (index === 1) {
            setIsLoginPhoneOrEmail(true)
        }
    }

    const handleItemSignUpPhoneOrEmail = (index) => {
        if (index === 0) {
            setIsSignUpPhoneOrEmail(true)
        }
    }


    const handleHeading = () => {
        if (isLoginPhoneOrEmail) return 'Log in';
        if (isSignUpPhoneOrEmail) return 'Sign up';
        if (isSignUp) return 'Sign up for TikTok';
        else return 'Log in to TikTok';
    }


    const handleShowHideConfirmPass = () => {
        if (!isShowConfirmPassword) {
            inputPassConfirmRef.current.type = 'text';
            setIsShowConfirmPassword(true);
        } else {
            inputPassConfirmRef.current.type = 'password';
            setIsShowConfirmPassword(false);
        }
    }

    const handleShowHidePass = () => {
        if (!isShowPassword) {
            inputPassRef.current.type = 'text';
            setIsShowPassword(true);
        } else {
            inputPassRef.current.type = 'password';
            setIsShowPassword(false);
        }
    }

    const handleClickItemMonth = (month) => {
        birthdayMonthRef.current.innerText = month;
        birthdayMonthRef.current.style.color = '#333';
        setIsBirthdayMonth(false);
    }

    const handleToggleLogin = () => {
        if (!isLoginEmail) {
            setInputCode('');
            setIsLoginEmail(true);
        } else {
            setEmail('');
            setPassword('');
            setIsBtnActive(false)
            setIsLoginEmail(false);
        }
    }

    const handleToggleSignUp = () => {
        if (!isSignUpEmail) {
            setInputCode('');
            setIsSignUpEmail(true);
            setIsLoginEmail(true)
        } else {
            setIsSignUpEmail(false);
            setIsLoginEmail(false);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    const handleToggleTypeSignUp = () => {
        if (!isSignUpEmail) {
            return 'Sign up with email';
        } else {
            return 'Sign up with phone';
        }
    }


    const handleToggleTypeLogin = () => {
        if (isLoginEmail) {
            return 'Log in with phone'
        } else {
            return 'Log in with email or username';
        }
    }


    return (
        <div className={cx("wrapper")} >
            <div className={cx('overlay')}></div>
            <div ref={innerRef} className={cx('inner')}>
                <div className={cx('body', { 'isSignUp': isSignUp })}>
                    <h1 className={cx('heading')}>{handleHeading()}</h1>
                    {isSignUp && !isSignUpPhoneOrEmail
                        ?
                        <ul className={cx('list')}>
                            {items.slice(1, 4).map((item, index) => (
                                <li
                                    key={index}
                                    className={cx('item')}
                                    onClick={() => handleItemSignUpPhoneOrEmail(index)}
                                >
                                    {item.icon}
                                    <span className={cx('title')}>{index === 0 ? 'Use phone or email' : item.title}</span>
                                </li>
                            ))}

                            {isMoreItem ?
                                (items.slice(4, 7).map((item, index) => (
                                    <li className={cx('item')} key={index}>
                                        {item.icon}
                                        <span className={cx('title')}>{item.title}</span>
                                    </li>
                                )))
                                :
                                <span className={cx('btn-more-item')} onClick={() => setIsMoreItem(true)}>
                                    <FontAwesomeIcon icon={faAngleDown} className={cx('icon-arrow-down')} />
                                </span>
                            }
                        </ul>
                        :
                        <ul className={cx('list')}>
                            {!isLoginPhoneOrEmail && !isSignUpPhoneOrEmail ?
                                (items.map((item, index) => (
                                    <li
                                        key={index}
                                        className={cx('item')}
                                        onClick={() => handleItemLoginPhoneOrEmail(index)}
                                    >
                                        {item.icon}
                                        <span className={cx('title')}>{item.title}</span>
                                    </li>
                                )))
                                : (
                                    <div className={cx('wrap-form')}>
                                        {isSignUpPhoneOrEmail && (
                                            <div className={cx('birthday-wrap')}>
                                                <span className={cx('birthday-title')}>When’s your birthday?</span>
                                                <div className={cx('birthday')}>
                                                    <Tippy
                                                        interactive
                                                        visible={isBirthdayMonth}
                                                        onClickOutside={() => setIsBirthdayMonth(false)}
                                                        placement="bottom"
                                                        render={props => (
                                                            <ul className={cx('birthday-month-list')} tabIndex={-1} {...props}>
                                                                {months.map((month, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className={cx('birthday-month-item')}
                                                                        onClick={() => handleClickItemMonth(month)}
                                                                    >
                                                                        {month}
                                                                    </li >
                                                                ))}
                                                            </ul>
                                                        )}
                                                    >
                                                        <div className={cx('birthday-month')}
                                                            onClick={() => {
                                                                if (isBirthdayYear === true || isBirthdayDay === true) {
                                                                    setIsBirthdayYear(false);
                                                                    setIsBirthdayDay(false);
                                                                }
                                                                setIsBirthdayMonth(!isBirthdayMonth);
                                                            }}
                                                        >
                                                            <span ref={birthdayMonthRef}>Month</span>
                                                            <Icons.ArrowDownIcon className={cx('icon', { 'active': isBirthdayMonth })} />
                                                        </div>
                                                    </Tippy>
                                                    <div className={cx('birthday-day')}
                                                        onClick={() => {
                                                            if (isBirthdayYear === true || isBirthdayMonth === true) {
                                                                setIsBirthdayYear(false);
                                                                setIsBirthdayMonth(false);
                                                            }
                                                            setIsBirthdayDay(!isBirthdayDay);
                                                        }}
                                                    >
                                                        <span>Day</span>
                                                        <Icons.ArrowDownIcon className={cx('icon', { 'active': isBirthdayDay })} />
                                                    </div>
                                                    <div className={cx('birthday-year')} onClick={() => {
                                                        if (isBirthdayDay === true || isBirthdayMonth === true) {
                                                            setIsBirthdayDay(false);
                                                            setIsBirthdayMonth(false);
                                                        }
                                                        setIsBirthdayYear(!isBirthdayYear);
                                                    }}
                                                    >
                                                        <span>Year</span>
                                                        <Icons.ArrowDownIcon className={cx('icon', { 'active': isBirthdayYear })} />
                                                    </div>
                                                </div>
                                                <span className={cx('birthday-description')}>Your birthday won't be shown publicly.</span>
                                            </div>
                                        )}
                                        <div className={cx('username-login-header')}>
                                            {isLoginEmail ? 'Email or username' : 'Phone'}
                                            <span
                                                className={cx('toggle-login')}
                                                onClick={isSignUpPhoneOrEmail ? handleToggleSignUp : handleToggleLogin}
                                            >
                                                {isLoginPhoneOrEmail && handleToggleTypeLogin()}
                                                {isSignUpPhoneOrEmail && handleToggleTypeSignUp()}

                                            </span>
                                        </div>
                                        <div className={cx('container-1')}>
                                            {!isLoginEmail ?
                                                (<>
                                                    <span className={cx('phone-selection')}>
                                                        VN +84
                                                        <span className={cx('phone-selection-icon')}><Icons.ArrowDownIcon /></span>
                                                    </span>
                                                    <input
                                                        className={cx('input-phone-number')}
                                                        type='number'
                                                        placeholder="Phone number" />
                                                </>) : (
                                                    <input
                                                        value={email}
                                                        className={cx('input-email')}
                                                        placeholder="Email or username"
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                )
                                            }
                                        </div>
                                        <div className={cx('container-2')}>
                                            {!isLoginEmail ? (
                                                <>
                                                    <input
                                                        value={inputCode}
                                                        className={cx('input-code')}
                                                        placeholder="Enter 6-digit code"
                                                        onChange={e => setInputCode(e.target.value)}
                                                    />
                                                    <button className={cx('send-code-btn')}>Send code</button>
                                                </>) : (
                                                <>
                                                    <input
                                                        ref={inputPassRef}
                                                        value={password}
                                                        className={cx('input-password')}
                                                        placeholder="password"
                                                        type='password'
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                    <span
                                                        className={cx('show-password')}
                                                        onClick={handleShowHidePass}
                                                    >
                                                        {isShowPassword ? <Icons.EyeOpenIcon /> : <Icons.EyeCloseIcon />}
                                                    </span>
                                                </>

                                            )}
                                        </div>
                                        {isSignUpEmail && (
                                            <>
                                                <div className={cx('container-3')}>
                                                    <input
                                                        ref={inputPassConfirmRef}
                                                        value={confirmPassword}
                                                        className={cx('input-password-confirm')}
                                                        placeholder="cofirm password"
                                                        type='password'
                                                        onChange={e => setConfirmPassword(e.target.value)}
                                                    />
                                                    <span
                                                        className={cx('show-password')}
                                                        onClick={handleShowHideConfirmPass}
                                                    >
                                                        {isShowConfirmPassword ? <Icons.EyeOpenIcon /> : <Icons.EyeCloseIcon />}
                                                    </span>
                                                </div>
                                                <div className={cx('container-4')}>
                                                    <input type='checkbox' checked={isChecked} />
                                                    <span className={cx('icon-checkbox', { active: isChecked })} onClick={() => setIsChecked(!isChecked)}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                    <span className={cx('checkbox-text')}>Get trending content, newsletters, promotions, recommendations, and account updates sent to your email</span>
                                                </div>
                                            </>
                                        )}
                                        {isSignUpPhoneOrEmail ? undefined :
                                            (<span className={cx('toggle-pass-or-code-btn')}>
                                                {isLoginEmail ? 'Forgot password?' : 'Log in with password'}
                                            </span>)
                                        }
                                        <button className={cx('btn', { 'btn-active': isBtnActive })}>{isSignUpPhoneOrEmail ? 'Next' : 'Log in'}</button>
                                    </div>
                                )}
                        </ul>
                    }
                </div >
                {
                    isSignUp && (
                        <div className={cx('policy')}>
                            <p className={cx('policy-title')}>
                                By continuing, you agree to TikTok's <a href="#" className={cx('policy-link')}>Terms of Service </a>
                                and confirm that you have read TikTok's <a href="#" className={cx('policy-link')}>Privacy Policy.</a>
                            </p>
                        </div>
                    )
                }

                <div className={cx('bottom', { isSignUp: isSignUp })}>
                    <span className={cx('bottom-text')}>{isSignUp ? 'Already have an account?' : 'Dont have an account?'}</span>
                    <span
                        className={cx('toggle-signup-login')}
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setIsSignUpEmail(false);
                            setIsLoginEmail(false);
                            setIsMoreItem(false)
                            setIsLoginPhoneOrEmail(false);
                            setIsSignUpPhoneOrEmail(false)
                        }}
                    >
                        {isSignUp ? 'Login' : 'Sign up'}
                    </span>
                </div>
                <div className={cx('close-btn')} onClick={handleCloseBtn}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                {
                    isLoginPhoneOrEmail || isSignUpPhoneOrEmail ?
                        (<div
                            className={cx('back-btn')}
                            onClick={() => isLoginPhoneOrEmail ? setIsLoginPhoneOrEmail(false) : setIsSignUpPhoneOrEmail(false)}
                        >
                            <Icons.ArrowLeftIcon />
                        </div>)
                        : undefined
                }
            </div >
        </div >
    )
}
export default ModalLogin;