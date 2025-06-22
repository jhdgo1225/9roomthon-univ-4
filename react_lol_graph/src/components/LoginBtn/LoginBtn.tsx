import { loginBtn } from "./LoginBtn.css";

export default function LoginBtn({ children }) {
    return <button className={loginBtn}>{children}</button>;
}
