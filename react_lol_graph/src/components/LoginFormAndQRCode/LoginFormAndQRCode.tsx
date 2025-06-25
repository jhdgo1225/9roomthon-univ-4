import { useCallback, useState } from "react";

import LoginForm from "../LoginForm/LoginForm";
import LoginMethodBtnSet from "../LoginMethodBtnSet/LoginMethodBtnSet";
import LoginQRCode from "../LoginQRCode/LoginQRCode";

export default function LoginFormOrQRCode() {
    const [loginMethod, setLoginMethod] = useState(0);
    const handleLoginMethod = useCallback((method: number) => {
        setLoginMethod(method);
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}>
            <LoginMethodBtnSet loginMethod={loginMethod} setLoginMethod={handleLoginMethod} />
            {loginMethod === 0 ? <LoginForm /> : <LoginQRCode />}
        </form>
    );
}
