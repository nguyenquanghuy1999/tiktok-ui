import { useEffect, useRef, useState } from "react";
import { faCircleXmark, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";

import styles from "./Search.module.scss";
import AccountItem from "../../../../Components/AccountItem"
import { default as PopperWrapper } from "../../../../Components/Popper"
import useDebounce from "../../../../hooks/useDebounce"
import * as searchServices from "../../../../services/searchService"


const cx = classNames.bind(styles);

function Search() {

    const [inputValue, setInputValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(inputValue, 500);
    const inputRef = useRef();

    const handleClear = () => {
        setInputValue("");
        setSearchResult([]);
        inputRef.current.focus();
    }



    const handleInput = e => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(" ")) {
            setInputValue(searchValue);
        }
    }


    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([])
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounceValue);
            if (result) {
                setSearchResult(result)
            } else {
                alert("No Response !")
            }
            setLoading(false);
        }
        fetchApi()

    }, [debounceValue])


    return (
        <Tippy
            interactive
            appendTo={document.body}
            visible={showResult && searchResult.length > 0}
            render={attrs => (
                <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <p className={cx("search-title")}>Accounts</p>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={() => setShowResult(false)}
        >
            <div className={cx("search")}>
                <input
                    ref={inputRef}
                    value={inputValue}
                    placeholder="Tìm kiếm tài khoản và video"
                    onChange={handleInput}
                    onFocus={() => setShowResult(true)}
                />


                {!!inputValue && !loading && (
                    <button className={cx("clear-btn")} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon icon={faSpinner} className={cx("loading")} />}

                <button className={cx("search-btn")} onMouseDown={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy >

    )
}
export default Search;