import LoginBackground from "../components/LoginBackground/LoginBackground";
import LoginSider from "../components/LoginSider/LoginSider";
import { loginPage } from "./LoginPage.css";

export default function LoginPage() {
    return (
        <div className={loginPage}>
            <LoginSider />
            <LoginBackground />
        </div>
    );
}
