import "./css/Collection.css";
import Footer from "../components/Footer";
import iconLeftArrow from "../assets/icons/icon_arrow_left.png";
import iconBell from "../assets/icons/icon_bell.png";
import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";
import hitujii from "../assets/characters/hitujii.png";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

function Collection() {
    const [characters, setCharacters] = useState<any[]>([]);
    const characterImages: { [key: string]: string } = {
        kaba: kaba,
        ghost: ghost,
        hitujii: hitujii,
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
    useEffect(() => {
        getCharacters();
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
                    <h2>コンプリート率</h2>
                    <span id="bar"></span>
                </div>
                <div className="filter_wrap">
                    <span>すべて</span>
                    <p>所持済み</p>
                </div>
                <div className="collection_wrap">
                    {characters.map((character) => (
                        <div className="collection_card" key={character.id}>
                            <img src={characterImages[character.image]} alt="" />
                            <h2>{character.name}</h2>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Collection;
