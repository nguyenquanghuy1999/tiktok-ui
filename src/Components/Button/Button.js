import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    rounded = false,
    disable = false,
    small = false,
    large = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...props }) {

    let Component = "button";

    const _props = {
        onClick,
        ...props
    }

    // remove listend event when is disable
    if (disable) {
        Object.keys(_props).forEach(key => {
            if (key.startsWith("on") && typeof _props[key] === "function") {
                delete _props[key];
            }
        })
    }


    if (to) {
        _props.to = to;
        Component = Link;
    } else if (href) {
        _props.href = href;
        Component = "a";
    }

    // styles
    const classes = cx("wrapper", {
        [className]: className,
        primary,
        outline,
        rounded,
        disable,
        small,
        large,
    })

    return (
        <Component className={classes} {..._props}>
            {leftIcon && <span className={cx("icon-left")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon-right")}>{rightIcon}</span>}
        </Component>
    )


}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
}



export default Button;