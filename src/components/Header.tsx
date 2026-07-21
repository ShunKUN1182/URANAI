import "./css/header.css";
import bellIcon from "../assets/icons/icon_bell.png";

function Header() {
    return (
        <>
            <header>
                <img src="./" alt="仮" />
                <img src={bellIcon} alt="" />
            </header>
        </>
    );
}

export default Header;
