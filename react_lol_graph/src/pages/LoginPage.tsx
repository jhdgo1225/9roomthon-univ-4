import LoginBackground from "../components/LoginBackground/LoginBackground";
import LoginForm from "../components/LoginSider/LoginSider";
import { loginPage } from "./LoginPage.css";

export default function LoginPage() {
    return (
        <div className={loginPage}>
            <LoginForm />
            <LoginBackground />
        </div>
    );
}
