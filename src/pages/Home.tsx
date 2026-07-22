import "./css/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";

// 画像インポートたちだよ
import daikitiIcon from "../assets/rarelyIcons/rarely_icon_daikiti.png";
import tyuukitiIcon from "../assets/rarelyIcons/icon_tyuukiti.png";
import kyouIcon from "../assets/rarelyIcons/icon_kyou.png";
import hitujii from "../assets/characters/hitujii.png";
import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";

function Home() {
    return (
        <>
            <Header />
            <main>
                <Post
                    userName="フクシマです"
                    userId="@ura_koko"
                    userIcon={kaba}
                    fortuneIcon={daikitiIcon}
                    characterImage={kaba}
                    characterName="カバ太郎"
                    fortuneMessage="おばかなことをしてみんなの注目を集めること間違い無しだね。"
                />

                <Post
                    userName="うら子"
                    userId="@ura_koko"
                    userIcon={kaba}
                    fortuneIcon={daikitiIcon}
                    characterImage={kaba}
                    characterName="カバ太郎"
                    fortuneMessage="おばかなことをしてみんなの注目を集めること間違い無しだね。"
                />
                <Post
                    userName="B子ちゃん"
                    userId="@bko_chan"
                    userIcon={ghost}
                    fortuneIcon={tyuukitiIcon}
                    characterImage={hitujii}
                    characterName="ひつじい"
                    fortuneMessage="おぬしは今日大事な場面で居眠りしてしまうのじゃ気をつけるのじゃぞ"
                />
                <Post
                    userName="ほそかわ"
                    userId="@hskw_2007"
                    userIcon={kaba}
                    fortuneIcon={kyouIcon}
                    characterImage={ghost}
                    characterName="しょんぼ霊"
                    fortuneMessage="今日はしょんぼりすること間違いなしなんだよ。映画とかで泣くよ"
                />
                <Post
                    userName="うぇだー"
                    userId="@weda_0322"
                    userIcon={hitujii}
                    fortuneIcon={tyuukitiIcon}
                    characterImage={hitujii}
                    characterName="ひつじい"
                    fortuneMessage="おぬしは今日大事な場面で居眠りしてしまうのじゃ気をつけるのじゃぞ"
                />
            </main>
            <Footer />
        </>
    );
}

export default Home;
