import { style } from "@vanilla-extract/css";

export const champList = style({
    width: "100%",
    height: "100%",
    overflowX: "hidden", // 가로 스크롤 방지
    overflowY: "auto", // 세로 스크롤 허용
    "::-webkit-scrollbar": {
        display: "none", // Chrome, Safari, Opera
    },
});

export const champListItem = style({
    position: "relative",
    width: "100%",
    height: "100px",
    cursor: "pointer",
    fontSize: "12px",
    textAlign: "right",
    whiteSpace: "normal",
    wordBreak: "keep-all",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 20px",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "::before": {
        content: "",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "var(--champ-image)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
    },
    "::after": {
        content: "",
        position: "absolute",
        top: 0,
        left: "100px",
        width: "calc(100% - 100px)",
        height: "100%",
        background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
        zIndex: 0,
    },
    "& h1": {
        position: "relative",
        zIndex: 1,
        margin: 0,
        color: "white",
        paddingLeft: "20px",
    },
});
