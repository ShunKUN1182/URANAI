import { Link } from "react-router-dom";
import "./css/Auth.css";
import kaba from "../assets/characters/kaba.png";
import logo from "../assets/logo.png";

function Login() {
    return (
        <main className="auth-page">
            <div className="auth-page__sparkle auth-page__sparkle--one">✦</div>
            <div className="auth-page__sparkle auth-page__sparkle--two">✧</div>
            <section className="auth-card" aria-labelledby="login-title">
                <div className="auth-brand">
                    <img src={logo} alt="URANAI" />
                </div>

                <div className="auth-card__heading">
                    <h2 id="login-title">おかえりなさい</h2>
                    <p>ログインして、今日の運勢を見てみよう。</p>
                </div>

                <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="login-email">メールアドレス</label>
                    <input id="login-email" type="email" placeholder="example@email.com" autoComplete="email" />
                    <label htmlFor="login-password">パスワード</label>
                    <input id="login-password" type="password" placeholder="8文字以上で入力" autoComplete="current-password" />
                    <Link className="auth-form__forgot" to="/login">パスワードを忘れた方</Link>
                    <button className="auth-form__submit" type="submit">ログイン</button>
                </form>

                <p className="auth-switch">はじめての方は <Link to="/signup">新規登録</Link></p>
            </section>
            <img className="auth-page__character" src={kaba} alt="" />
        </main>
    );
}

export default Login;
