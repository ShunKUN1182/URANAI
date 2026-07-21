import "./css/post.css";
import daikitiIcon from "../assets/rarelyIcons/rarely_icon_daikiti.png";
import hitujii from "../assets/characters/hitujii.png";

function Post() {
    return (
        <>
            <div className="card_box">
                <img src="./" alt="仮" className="icon" />
                <div className="card_wrap">
                    <div className="card_head">
                        <div className="card_text">
                            <h2>うら子</h2>
                            <p>@uranai_123</p>
                        </div>
                        <div className="card_details">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="card_front_wrap">
                        <img src={daikitiIcon} alt="" />
                        <img src={hitujii} alt="" className="charaImg" />
                        <h2>ひつじい</h2>
                        <h3>今日の格言</h3>
                        <p>おぬしは今日大事な場面で居眠りしてしまうのじゃ気をつけるのじゃぞ</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
