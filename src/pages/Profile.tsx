import { useEffect, useState } from "react";
import "./css/Profile.css";
import Footer from "../components/Footer";
import myIcon from "../assets/icons/myIcon.jpeg";
import Post from "../components/Post";
import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";
import hitujii from "../assets/characters/hitujii.png";
import goriyasu from "../assets/characters/goriyasu.png";
import azarasi from "../assets/characters/azarasi.png";
import drinkun from "../assets/characters/drinkun.png";
import soccerball from "../assets/characters/soccerBall.png";
import monariza from "../assets/characters/monariza.jpg";
import susimaru from "../assets/characters/susimaru.png";
import kyouKichi from "../assets/rarelyIcons/kyou_kichi.png";
import kabaKichi from "../assets/rarelyIcons/kaba_kichi.png";
import reiKichi from "../assets/rarelyIcons/rei_kichi.png";
import hitujiKichi from "../assets/rarelyIcons/hituji_kichi.png";
import jiiKichi from "../assets/rarelyIcons/jii_kichi.png";
import bakaKichi from "../assets/rarelyIcons/baka_kichi.png";
import daiKichi from "../assets/rarelyIcons/rarely_icon_daikiti.png";
import tyuukichi from "../assets/rarelyIcons/icon_tyuukiti.png";
import { Link } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";

type User = {
    id: number;
    user_id: string;
    user_name: string;
    icon?: string | null;
};

type UserFortune = {
    id: number;
    created_at: string;
    character_id: number;
    character_name: string;
    character_image: string;
    fortune_id: number;
    fortune_name: string;
    fortune_message: string;
    fortune_image: string;
};

const characterImages: Record<string, string> = {
    kaba,
    ghost,
    hitujii,
    goriyasu,
    azarasi,
    drinkun,
    soccerball,
    monariza,
    susimaru,
};

const fortuneImages: Record<string, string> = {
    kyou_kichi: kyouKichi,
    kaba_kichi: kabaKichi,
    rei_kichi: reiKichi,
    hituji_kichi: hitujiKichi,
    jii_kichi: jiiKichi,
    baka_kichi: bakaKichi,
    dai_kichi: daiKichi,
    tyu_kichi: tyuukichi,
};

function Profile() {
    const [user] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch {
            return null;
        }
    });
    const [fortunes, setFortunes] = useState<UserFortune[]>([]);
    const [isLoading, setIsLoading] = useState(Boolean(user));
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!user) {
            return;
        }
        const userId = user.id;

        async function fetchFortunes() {
            try {
                const response = await fetch("https://fksm.tonkotsu.jp/uranai/user_fortunes.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id: userId }),
                });
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || "占い履歴の取得に失敗しました。");
                }

                setFortunes(data.fortunes);
            } catch (error) {
                setErrorMessage(
                    error instanceof Error ? error.message : "占い履歴の取得に失敗しました。",
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchFortunes();
    }, [user]);

    const displayErrorMessage =
        errorMessage || (!user ? "占い履歴を表示するにはログインしてください。" : "");

    return (
        <>
            <div className="header"></div>
            <main>
                <div className="profile_wrap">
                    <UserAvatar
                        userDatabaseId={user?.id}
                        userName={user?.user_name || "プロフィール"}
                        userIcon={user?.icon || myIcon}
                        className="profile-avatar"
                    />
                    <div className="profile_text">
                        <h2>{user?.user_name || "プロフィール"}</h2>
                        <div className="follow_wrap">
                            <div>
                                <h3>{fortunes.length}</h3>
                                <p>占い回数</p>
                            </div>
                            <div>
                                <h3>45</h3>
                                <p>フォロワー</p>
                            </div>
                            <div>
                                <h3>71</h3>
                                <p>フォロー中</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="profile_info">{user ? `${user.user_id}` : ""}</p>
                <div className="profile_btn_wrap">
                    <div>プロフィールを編集</div>
                    <div>プロフィールを共有</div>
                </div>
                <div className="collection_btn_wrap">
                    <Link to="/collection">コレクション</Link>
                    <Link to="/">実績</Link>
                </div>
                {isLoading && <p className="profile_status">占い履歴を読み込んでいます…</p>}
                {displayErrorMessage && <p className="profile_status">{displayErrorMessage}</p>}
                {!isLoading && !displayErrorMessage && fortunes.length === 0 && (
                    <p className="profile_status">まだ占い履歴はありません。</p>
                )}
                {fortunes.map((fortune) => (
                    <Post
                        key={fortune.id}
                        userName={user?.user_name || "プロフィール"}
                        userId={user ? `${user.user_id}` : ""}
                        userIcon={user?.icon || myIcon}
                        userDatabaseId={user?.id}
                        fortuneIcon={fortuneImages[fortune.fortune_image] || kyouKichi}
                        characterImage={characterImages[fortune.character_image] || kaba}
                        characterName={fortune.character_name}
                        fortuneMessage={fortune.fortune_message}
                    />
                ))}
            </main>
            <Footer />
        </>
    );
}

export default Profile;
