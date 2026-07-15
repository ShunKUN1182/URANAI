import "./css/footer.css";
import iconHome from "../assets/icons/icon_home.png";
import iconHomeActive from "../assets/icons/icon_home_active.png";
import iconFriend from "../assets/icons/icon_friend.png";
import iconFriendActive from "../assets/icons/icon_friend_active.png";
import iconDM from "../assets/icons/icon_dm.png";
import iconDMActive from "../assets/icons/icon_dm_active.png";

function Footer() {
    return (
        <>
            <footer>
                <img src={iconHome} alt="" />
                <img src={iconFriend} alt="" />
                <img src={iconDM} alt="" />
            </footer>
        </>
    );
}

export default Footer;
