import "./css/Profile.css";
import Footer from "../components/Footer";
import myIcon from "../assets/icons/myIcon.jpeg";
import Post from "../components/Post";
import kaba from "../assets/characters/kaba.png";
import daikitiIcon from "../assets/rarelyIcons/rarely_icon_daikiti.png";

function Profile() {
    return (
        <>
            <div className="header￥"></div>
            <main>
                <div className="profile_wrap">
                    <img src={myIcon} alt="" />
                    <div className="profile_text">
                        <h2>フクシマです</h2>
                        <div className="follow_wrap">
                            <div>
                                <h3>13</h3>
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
                <p className="profile_info">大吉引きたいな</p>
                <div className="profile_btn_wrap">
                    <div>プロフィールを編集</div>
                    <div>プロフィールを共有</div>
                </div>
                <div className="collection_btn_wrap">
                    <div>コレクション</div>
                    <div>実績</div>
                </div>
                <Post
                    userName="うら子"
                    userId="@ura_koko"
                    userIcon={kaba}
                    fortuneIcon={daikitiIcon}
                    characterImage={kaba}
                    characterName="カバ太郎"
                    fortuneMessage="おばかなことをしてみんなの注目を集めること間違い無しだね。"
                />
            </main>
            <Footer />
        </>
    );
}

export default Profile;
