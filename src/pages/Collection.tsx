import "./css/Collection.css";
import Footer from "../components/Footer";
import iconLeftArrow from "../assets/icons/icon_arrow_left.png";
import iconBell from "../assets/icons/icon_bell.png";
import { Link } from "react-router-dom";

function Collection() {
    return (
        <>
            <div className="collection_header">
                <Link to="/profile">
                    <img src={iconLeftArrow} alt="" />
                </Link>
                <h1>コレクション</h1>
                <img src={iconBell} alt="" />
            </div>
            <main>
                <h1>コレクションだよ</h1>
            </main>
            <Footer />
        </>
    );
}

export default Collection;
