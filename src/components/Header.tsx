import "./css/header.css";
import bellIcon from "../assets/icons/icon_bell.png";
import myIcon from "../assets/icons/myIcon.jpeg";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";

type SavedUser = {
    id?: number | string;
    user_name?: string;
    icon?: string | null;
};

function Header() {
    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null") as SavedUser | null;
        } catch {
            return null;
        }
    })();

    return (
        <>
            <header>
                <Link to="/profile">
                    <UserAvatar
                        userDatabaseId={user?.id}
                        userName={user?.user_name || "プロフィール"}
                        userIcon={user?.icon || myIcon}
                        className="header-avatar"
                    />
                </Link>
                <img src={bellIcon} alt="" />
            </header>
        </>
    );
}

export default Header;
