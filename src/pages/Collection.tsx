import "./css/Collection.css";
import Footer from "../components/Footer";
import iconLeftArrow from "../assets/icons/icon_arrow_left.png";
import iconBell from "../assets/icons/icon_bell.png";
import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";
import hitujii from "../assets/characters/hitujii.png";

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
            <main className="collection_main">
                <div className="complete_wrap">
                    <h2>コンプリート率</h2>
                    <span id="bar"></span>
                </div>
                <div className="filter_wrap">
                    <span>すべて</span>
                    <p>所持済み</p>
                </div>
                <div className="collection_wrap">
                    <div className="collection_card">
                        <img src={kaba} alt="" />
                        <h2>カバ太郎</h2>
                    </div>
                    <div className="collection_card">
                        <img src={ghost} alt="" />
                        <h2>しょんぼ霊</h2>
                    </div>
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>{" "}
                    <div className="collection_card secret">
                        <img src={hitujii} alt="" />
                        <h2>ひつじい</h2>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Collection;
