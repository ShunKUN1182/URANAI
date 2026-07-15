import "./css/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Header />
            <main>
                <h1>ホームだよ</h1>
            </main>
            <Footer />
        </>
    );
}

export default Home;
