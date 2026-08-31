import { Link } from "react-router-dom";
import "./css/Auth.css";
import ghost from "../assets/characters/ghost.png";
import logo from "../assets/logo.png";
import { useState } from "react";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch("https://fksm.tonkotsu.jp/uranai/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <main className="auth-page auth-page--signup">
            <div className="auth-page__sparkle auth-page__sparkle--one">✦</div>
            <div className="auth-page__sparkle auth-page__sparkle--two">✧</div>
            <section className="auth-card" aria-labelledby="signup-title">
                <div className="auth-brand">
                    <img src={logo} alt="URANAI" />
                </div>

                <div className="auth-card__heading">
                    <h2 id="signup-title">はじめよう</h2>
                    <p>あなたの毎日に、ちいさな占いを。</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="signup-name">ニックネーム</label>
                    <input
                        id="signup-name"
                        type="text"
                        placeholder="表示する名前を入力"
                        autoComplete="nickname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="signup-email">メールアドレス</label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="example@email.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="signup-password">パスワード</label>
                    <input
                        id="signup-password"
                        type="password"
                        placeholder="8文字以上で入力"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="auth-form__submit" type="submit">
                        新規登録
                    </button>
                </form>

                <p className="auth-switch">
                    すでに登録済みの方は <Link to="/login">ログイン</Link>
                </p>
            </section>
            <img className="auth-page__character" src={ghost} alt="" />
        </main>
    );
}

export default Signup;
