import "./css/header.css";
import bellIcon from "../assets/icons/icon_bell.png";
import myIcon from "../assets/icons/myIcon.jpeg";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <header>
                <Link to="/profile">
                    <img src={myIcon} alt="仮" />
                </Link>
                <img src={bellIcon} alt="" />
            </header>
        </>
    );
}

export default Header;
