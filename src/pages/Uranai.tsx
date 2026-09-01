import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Uranai.css";
import cardBack from "../assets/background/card_back_bg.png";

import kyou_kichi from "../assets/rarelyIcons/kyou_kichi.png";
import kaba_kichi from "../assets/rarelyIcons/kaba_kichi.png";
import rei_kichi from "../assets/rarelyIcons/rei_kichi.png";
import hituji_kichi from "../assets/rarelyIcons/hituji_kichi.png";
import jii_kichi from "../assets/rarelyIcons/jii_kichi.png";
import baka_kichi from "../assets/rarelyIcons/baka_kichi.png";

import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";
import hitujii from "../assets/characters/hitujii.png";

function Uranai() {
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [isFortuneRevealed, setIsFortuneRevealed] = useState(false);
    const [fortuneData, setFortuneData] = useState<any>(null);
    const characterImages: { [key: string]: string } = {
        kaba: kaba,
        ghost: ghost,
        hitujii: hitujii,
    };
    const fortuneImages: { [key: string]: string } = {
        kaba_kichi: kaba_kichi,
        rei_kichi: rei_kichi,
        hituji_kichi: hituji_kichi,
        jii_kichi: jii_kichi,
        baka_kichi: baka_kichi,
        kyou_kichi: kyou_kichi,
    };

    async function getFortune() {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "null");

            if (!user) {
                throw new Error("ログイン情報がありません");
            }

            const response = await fetch("https://fksm.tonkotsu.jp/uranai/fortune.php", {
                method: "POST",
            });

            const data = await response.json();

            console.log(data);

            if (!data.success) {
                throw new Error(data.message);
            }

            setFortuneData(data);

            const saveResponse = await fetch("https://fksm.tonkotsu.jp/uranai/save_fortune.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    character_id: data.character.id,
                    fortune_id: data.fortune.id,
                }),
            });

            const saveData = await saveResponse.json();
            console.log("保存結果:", saveData);
            if (!saveData.success) {
                throw new Error(saveData.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function selectCard(index: number) {
        setSelectedCardIndex(index);
    }

    if (selectedCardIndex !== null) {
        return (
            <div className="uranai_wrap">
                {isFortuneRevealed ? (
                    <>
                        {fortuneData && (
                            <div className="card_front_wrap">
                                <img src={fortuneImages[fortuneData.fortune.image]} alt="" />
                                <img
                                    src={characterImages[fortuneData.character.image]}
                                    alt=""
                                    className="charaImg"
                                />
                                <h2>{fortuneData.character.name}</h2>
                                <h3>今日の格言</h3>
                                <p>{fortuneData.fortune.message}</p>
                            </div>
                        )}
                        <Link className="homeBtn" to="/">
                            ホームに戻る
                        </Link>
                    </>
                ) : (
                    <div className="fortune_result">
                        <button
                            type="button"
                            className="fortune_card_button"
                            onClick={async () => {
                                getFortune();
                                setIsFortuneRevealed(true);
                            }}
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
                    <p>どれに選ぶかばー</p>
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
