import "./css/Collection.css";
import Footer from "../components/Footer";
import iconLeftArrow from "../assets/icons/icon_arrow_left.png";
import iconBell from "../assets/icons/icon_bell.png";
import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";
import hitujii from "../assets/characters/hitujii.png";
import goriyasu from "../assets/characters/goriyasu.png";
import azarasi from "../assets/characters/azarasi.png";
import drinkun from "../assets/characters/drinkun.png";
import soccerball from "../assets/characters/soccerBall.png";
import monariza from "../assets/characters/monariza.jpg";
import susimaru from "../assets/characters/susimaru.png";

import { useState, useEffect, type CSSProperties } from "react";

import { Link } from "react-router-dom";

function Collection() {
    const [characters, setCharacters] = useState<any[]>([]);
    const [ownedCharacterIds, setOwnedCharacterIds] = useState<number[]>([]);
    const [showOwnedOnly, setShowOwnedOnly] = useState(false);
    const completionRate = characters.length
        ? Math.floor((ownedCharacterIds.length / characters.length) * 100)
        : 0;
    const displayedCharacters = showOwnedOnly
        ? characters.filter((character) => ownedCharacterIds.includes(character.id))
        : characters;

    const characterImages: { [key: string]: string } = {
        kaba: kaba,
        ghost: ghost,
        hitujii: hitujii,
        goriyasu: goriyasu,
        azarasi: azarasi,
        drinkun: drinkun,
        soccerball: soccerball,
        monariza: monariza,
        susimaru: susimaru,
    };

    async function getCharacters() {
        try {
            const response = await fetch("https://fksm.tonkotsu.jp/uranai/characters.php");

            const data = await response.json();

            console.log(data);

            if (!data.success) {
                throw new Error(data.message);
            }

            setCharacters(data.characters);
        } catch (error) {
            console.error(error);
        }
    }

    async function getUserCharacters() {
        const user = JSON.parse(localStorage.getItem("user") || "null");

        const response = await fetch("https://fksm.tonkotsu.jp/uranai/user_characters.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
            }),
        });

        const data = await response.json();
        setOwnedCharacterIds(data.character_ids);
        console.log(data);
    }

    useEffect(() => {
        getCharacters();
        getUserCharacters();
    }, []);
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
                    <div className="complete_text">
                        <h2>コンプリート率</h2>
                        <p>{completionRate}%</p>
                    </div>
                    <span
                        id="bar"
                        style={{ "--completion-rate": `${completionRate}%` } as CSSProperties}
                    ></span>
                </div>
                <div className="filter_wrap">
                    <button
                        type="button"
                        className={!showOwnedOnly ? "is-active" : ""}
                        onClick={() => setShowOwnedOnly(false)}
                    >
                        すべて
                    </button>
                    <button
                        type="button"
                        className={showOwnedOnly ? "is-active" : ""}
                        onClick={() => setShowOwnedOnly(true)}
                    >
                        所持済み
                    </button>
                </div>
                <div className="collection_wrap">
                    {displayedCharacters.map((character) => {
                        const inOwned = ownedCharacterIds.includes(character.id);
                        return (
                            <div
                                className={inOwned ? "collection_card" : "collection_card secret"}
                                key={character.id}
                            >
                                <img src={characterImages[character.image]} alt="" />
                                <h2>{character.name}</h2>
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Collection;
