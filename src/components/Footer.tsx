import "./css/footer.css";
import iconHome from "../assets/icons/icon_home.png";
import iconHomeActive from "../assets/icons/icon_home_active.png";
import iconFriend from "../assets/icons/icon_friend.png";
import iconFriendActive from "../assets/icons/icon_friend_active.png";
import iconDM from "../assets/icons/icon_dm.png";
import iconDMActive from "../assets/icons/icon_dm_active.png";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer>
                <Link to="/">
                    <img src={iconHome} alt="" />
                </Link>
                <Link to="/friend">
                    <img src={iconFriend} alt="" />
                </Link>
                <Link to="/dm">
                    <img src={iconDM} alt="" />
                </Link>
            </footer>
        </>
    );
}

export default Footer;
