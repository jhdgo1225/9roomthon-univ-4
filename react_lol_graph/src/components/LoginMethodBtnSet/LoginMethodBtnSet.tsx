import { loginMethodBtn, loginMethodBtnSet } from "./LoginMethodBtnSet.css";

function LoginMethodBtn({
    method,
    isClicked,
    setLoginMethod,
    children,
}: {
    method: number;
    isClicked: boolean;
    setLoginMethod: (method: number) => void;
    children: string;
}) {
    return (
        <button
            onClick={() => setLoginMethod(method)}
            className={loginMethodBtn}
            data-clicked={isClicked}>
            {children}
        </button>
    );
}

export default function LoginMethodBtnSet({
    loginMethod,
    setLoginMethod,
}: {
    loginMethod: number;
    setLoginMethod: (method: number) => void;
}) {
    return (
        <div className={loginMethodBtnSet}>
            <LoginMethodBtn
                method={0}
                isClicked={loginMethod === 0}
                setLoginMethod={setLoginMethod}>
                로그인
            </LoginMethodBtn>
            <LoginMethodBtn
                method={1}
                isClicked={loginMethod === 1}
                setLoginMethod={setLoginMethod}>
                QR 코드
            </LoginMethodBtn>
        </div>
    );
}
