import { useState } from "react";
import "./css/Uranai.css";
import kaba from "../assets/characters/kaba.png";
import cardBack from "../assets/background/card_back_bg.png";

function Uranai() {
    const [isResultVisible, setIsResultVisible] = useState(false);

    if (isResultVisible) {
        return (
            <div className="uranai_wrap">
                <div className="card_wrap">
                    <div>
                        <img src={cardBack} alt="" />
                    </div>
                    <div>
                        <img src={cardBack} alt="" />
                    </div>
                    <div>
                        <img src={cardBack} alt="" />
                    </div>
                    <div>
                        <img src={cardBack} alt="" />
                    </div>
                    <div>
                        <img src={cardBack} alt="" />
                    </div>
                    <div>
                        <img src={cardBack} alt="" />
                    </div>
                </div>
                <div className="chara_wrap">
                    <p>どれか選ぶかばー</p>
                    <img src={kaba} alt="カバのキャラクター" />
                </div>
            </div>
        );
    }

    return (
        <div className="uranai_wrap">
            <button className="tapBtn" onClick={() => setIsResultVisible(true)}>
                タップして占う！
            </button>

            <div className="chara_wrap">
                <p>なにがでるかば！？</p>
                <img src={kaba} alt="カバのキャラクター" />
            </div>
        </div>
    );
}

export default Uranai;
