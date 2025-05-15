import {
    createGlobalThemeContract,
    createGlobalTheme,
    globalStyle,
} from "@vanilla-extract/css";

const themeContract = createGlobalThemeContract(
    {
        background: "background", // CSS 변수명으로 사용할 수 있는 문자열로 변경
        foreground: "foreground",
        fontSans: "fontSans",
        fontMono: "fontMono",
    },
    {
        // 생성되는 변수 이름 앞에 붙을 prefix (선택)
        prefix: "theme",
    }
);

// 2) 라이트 모드 기본값
createGlobalTheme(":root", themeContract, {
    background: "#ffffff",
    foreground: "#171717",
    fontSans: "var(--font-geist-sans)",
    fontMono: "var(--font-geist-mono)",
});

// 3) 다크 모드 오버라이드
createGlobalTheme("@media (prefers-color-scheme: dark) :root", themeContract, {
    background: "#0a0a0a",
    foreground: "#ededed",
    fontSans: "var(--font-geist-sans)",
    fontMono: "var(--font-geist-mono)",
});

globalStyle("body", {
    background: themeContract.background,
    color: themeContract.foreground,
    fontFamily: themeContract.fontSans,
});

globalStyle("*", {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
});

globalStyle("button", {
    cursor: "pointer",
});

globalStyle("img", {
    "&": {
        WebkitUserDrag: "none", // -webkit-user-drag
        KhtmlUserDrag: "none", // -khtml-user-drag
        MozUserDrag: "none", // -moz-user-drag
        OUserDrag: "none", // -o-user-drag
        userDrag: "none", // user-drag
    },
});
