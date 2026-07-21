import "./css/footer.css";
import iconHome from "../assets/icons/icon_home.png";
import iconHomeActive from "../assets/icons/icon_home_active.png";
import iconFriend from "../assets/icons/icon_friend.png";
import iconFriendActive from "../assets/icons/icon_friend_active.png";
import iconDM from "../assets/icons/icon_dm.png";
import iconDMActive from "../assets/icons/icon_dm_active.png";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer>
                <NavLink to="/">
                    {({ isActive }) => (
                        <img src={isActive ? iconHomeActive : iconHome} alt="HomeIcon" />
                    )}
                </NavLink>
                <NavLink to="/friend">
                    {({ isActive }) => (
                        <img src={isActive ? iconFriendActive : iconFriend} alt="HomeIcon" />
                    )}
                </NavLink>
                <NavLink to="/dm">
                    {({ isActive }) => (
                        <img src={isActive ? iconDMActive : iconDM} alt="HomeIcon" />
                    )}
                </NavLink>
            </footer>
        </>
    );
}

export default Footer;
