import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import ListForYou from "../../Components/ListForYou";

const cx = classNames.bind(styles);

function Home() {

    const [foryou, setForyou] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/for_you")
            .then(res => res.json())
            .then(data => setForyou(data))
    }, [])

    return (
        <div className={cx("home-list")}>
            {foryou.map((data, index) => (
                <ListForYou key={index} data={data} />
            ))} 
        </div>
    )
}
export default Home;