import {
    account,
    accountIssue,
    dividerChild,
    dividerChildCenter,
    signUpDivider,
    version,
} from "./Account.css";

function AccountIssue({ children }: { children: string }) {
    return <button className={accountIssue}>{children}</button>;
}

function Version({ children }: { children: string }) {
    return <span className={version}>{children}</span>;
}

export default function Account() {
    return (
        <div className={account}>
            <AccountIssue>로그인이 안 되시나요?</AccountIssue>
            <div className={signUpDivider}>
                <div className={dividerChild}></div>
                <div className={dividerChildCenter}>
                    <AccountIssue>계정 생성</AccountIssue>
                </div>
                <div className={dividerChild}>
                    <Version>v111.0.0</Version>
                </div>
            </div>
        </div>
    );
}
