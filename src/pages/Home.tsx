import "./css/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";

function Home() {
    return (
        <>
            <Header />
            <main>
                <Post />
            </main>
            <Footer />
        </>
    );
}

export default Home;
