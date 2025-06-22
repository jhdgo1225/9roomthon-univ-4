import { loginBackground, loginBackgroundImg } from "./LoginBackground.css";

export default function LoginBackground() {
    return (
        <div className={loginBackground}>
            <img
                src="/image/login.png"
                alt="login"
                className={loginBackgroundImg}
            />
        </div>
    );
}
