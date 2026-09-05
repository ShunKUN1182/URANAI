import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";

import kaba from "../assets/characters/kaba.png";
import ghost from "../assets/characters/ghost.png";
import hitujii from "../assets/characters/hitujii.png";
import goriyasu from "../assets/characters/goriyasu.png";
import azarasi from "../assets/characters/azarasi.png";
import drinkun from "../assets/characters/drinkun.png";
import soccerball from "../assets/characters/soccerBall.png";
import monariza from "../assets/characters/monariza.jpg";
import susimaru from "../assets/characters/susimaru.png";
import myIcon from "../assets/icons/myIcon.jpeg";
import kyouKichi from "../assets/rarelyIcons/kyou_kichi.png";
import kabaKichi from "../assets/rarelyIcons/kaba_kichi.png";
import reiKichi from "../assets/rarelyIcons/rei_kichi.png";
import hitujiKichi from "../assets/rarelyIcons/hituji_kichi.png";
import jiiKichi from "../assets/rarelyIcons/jii_kichi.png";
import bakaKichi from "../assets/rarelyIcons/baka_kichi.png";
import daiKichi from "../assets/rarelyIcons/rarely_icon_daikiti.png";
import tyuukichi from "../assets/rarelyIcons/icon_tyuukiti.png";

type FeedPost = {
    id: number;
    user_id: string;
    user_name: string;
    user_icon: string | null;
    character_name: string;
    character_image: string;
    fortune_name: string;
    fortune_message: string;
    fortune_image: string;
};

const POSTS_PER_PAGE = 5;
const characterImages: Record<string, string> = {
    kaba,
    ghost,
    hitujii,
    goriyasu,
    azarasi,
    drinkun,
    soccerball,
    monariza,
    susimaru,
};
const fortuneImages: Record<string, string> = {
    kyou_kichi: kyouKichi,
    kaba_kichi: kabaKichi,
    rei_kichi: reiKichi,
    hituji_kichi: hitujiKichi,
    jii_kichi: jiiKichi,
    baka_kichi: bakaKichi,
    dai_kichi: daiKichi,
    tyu_kichi: tyuukichi,
};

function Home() {
    const navigate = useNavigate();
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isRequestingRef = useRef(false);
    const hasRequestedInitialRef = useRef(false);
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadPosts = useCallback(async () => {
        if (isRequestingRef.current || !hasMore) {
            return;
        }

        isRequestingRef.current = true;
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("https://fksm.tonkotsu.jp/uranai/posts.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ limit: POSTS_PER_PAGE, offset: posts.length }),
            });
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "投稿の取得に失敗しました。");
            }

            setPosts((currentPosts) => [...currentPosts, ...data.posts]);
            setHasMore(data.has_more);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "投稿の取得に失敗しました。");
        } finally {
            isRequestingRef.current = false;
            setIsLoading(false);
        }
    }, [hasMore, posts.length]);

    useEffect(() => {
        const todayString = new Date().toLocaleDateString();
        if (localStorage.getItem("todayLogin") !== todayString) {
            navigate("/uranai");
            localStorage.setItem("todayLogin", todayString);
        }
    }, [navigate]);

    useEffect(() => {
        if (hasRequestedInitialRef.current) {
            return;
        }
        hasRequestedInitialRef.current = true;
        void loadPosts();
    }, [loadPosts]);

    useEffect(() => {
        const target = loadMoreRef.current;
        if (!target || !hasMore) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    void loadPosts();
                }
            },
            { rootMargin: "200px" },
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [hasMore, loadPosts]);

    return (
        <>
            <Header />
            <main>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        userName={post.user_name}
                        userId={`${post.user_id}`}
                        userIcon={post.user_icon || myIcon}
                        fortuneIcon={fortuneImages[post.fortune_image] || kyouKichi}
                        characterImage={characterImages[post.character_image] || kaba}
                        characterName={post.character_name}
                        fortuneMessage={post.fortune_message}
                    />
                ))}
                <div className="feed-status" ref={loadMoreRef}>
                    {isLoading && "投稿を読み込んでいます…"}
                    {errorMessage && errorMessage}
                    {!isLoading && !errorMessage && posts.length === 0 && "投稿はまだありません。"}
                    {!isLoading &&
                        !errorMessage &&
                        posts.length > 0 &&
                        !hasMore &&
                        "すべての投稿を表示しました。"}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Home;
