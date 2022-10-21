import PropTypes from 'prop-types';
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { default as PopperWrapper } from "../index";
import MenuItem from "./MenuItem";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, onChange = () => { }     }) {

    const [menu, setMenu] = useState([{ data: items }]);
    const current = menu[menu.length - 1];

    const renderItems = () => current.data.map((item, index) => {
        const isParent = !!item.children;
        return <MenuItem key={index} data={item} onClick={() => {
            if (isParent) {
                setMenu(prev => [...prev, item.children])
            } else {
                onChange(item)
            }

        }} />;
    });

    const renderResult = attrs => (
        <div tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx("menu-list")}>
                {menu.length > 1 &&
                    <HeaderMenu
                        title={current.title}
                        onBack={handleBack}
                    />
                }
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    )

    const handleBack = () => {
        setMenu(prev => prev.slice(0, prev.length - 1))
    }

    // handle reset first menu
    const handleReset = () => setMenu(prev => prev.slice(0, 1));

    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleReset}

        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func

}

export default Menu;