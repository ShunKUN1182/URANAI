import "./css/post.css";
import UserAvatar from "./UserAvatar";

type PostProps = {
    userName: string;
    userId: string;
    userIcon: string;
    userDatabaseId?: number | string | null;
    fortuneIcon: string;
    characterImage: string;
    characterName: string;
    fortuneMessage: string;
};

function Post({
    userName,
    userId,
    userIcon,
    userDatabaseId,
    fortuneIcon,
    characterImage,
    characterName,
    fortuneMessage,
}: PostProps) {
    return (
        <>
            <div className="card_box">
                <UserAvatar
                    userDatabaseId={userDatabaseId}
                    userName={userName}
                    userIcon={userIcon || "./"}
                    className="icon"
                />
                <div className="card_wrap">
                    <div className="card_head">
                        <div className="card_text">
                            <h2>{userName}</h2>
                            <p>{userId}</p>
                        </div>
                        <div className="card_details">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="card_front_wrap">
                        <img src={fortuneIcon} alt="" />
                        <img src={characterImage} alt="" className="charaImg" />
                        <h2>{characterName}</h2>
                        <h3>今日の格言</h3>
                        <p>{fortuneMessage}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
