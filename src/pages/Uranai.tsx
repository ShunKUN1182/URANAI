import { useState } from "react";
import "./css/Uranai.css";
import kaba from "../assets/characters/kaba.png";
import cardBack from "../assets/background/card_back_bg.png";
import kyouIcon from "../assets/rarelyIcons/icon_kyou.png";
import ghost from "../assets/characters/ghost.png";
import { Link } from "react-router-dom";

function Uranai() {
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [isFortuneRevealed, setIsFortuneRevealed] = useState(false);

    function selectCard(index: number) {
        setSelectedCardIndex(index);
    }

    if (selectedCardIndex !== null) {
        return (
            <div className="uranai_wrap">
                {isFortuneRevealed ? (
                    <>
                        <div className="card_front_wrap">
                            <img src={kyouIcon} alt="" />
                            <img src={ghost} alt="" className="charaImg" />
                            <h2>しょんぼ霊</h2>
                            <h3>今日の格言</h3>
                            <p>悲しまないで、、、僕が悲しくなるから、、、</p>
                        </div>
                        <Link className="homeBtn" to="/">
                            ホームに戻る
                        </Link>
                    </>
                ) : (
                    <div className="fortune_result">
                        <button
                            type="button"
                            className="fortune_card_button"
                            onClick={() => setIsFortuneRevealed(true)}
                            aria-label="占い結果を表示する"
                        >
                            <img
                                src={cardBack}
                                alt="占い結果のカード"
                                className="fortune_character"
                            />
                        </button>
                        <h1>Tap to Next</h1>
                    </div>
                )}
            </div>
        );
    }

    if (isResultVisible) {
        return (
            <div className="uranai_wrap">
                <div className="card_wrap">
                    {Array.from({ length: 6 }, (_, index) => (
                        <button type="button" key={index} onClick={() => selectCard(index)}>
                            <img src={cardBack} alt={`${index + 1}枚目のカード`} />
                        </button>
                    ))}
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
