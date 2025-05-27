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

    // 1) 배경 이미지
    "::before": {
        content: "",
        position: "absolute",
        top: 0,
        left: 0,
        width: "200px",
        height: "100%",
        backgroundImage: "var(--champ-image)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
    },

    // 2) 그라데이션(검은색→투명) 영역을 좀 더 넓혀서
    "::after": {
        content: "",
        position: "absolute",
        top: 0,
        left: "200px", // 시작 위치를 더 왼쪽으로 당겨서
        width: "calc(100% - 200px)", // 전체 폭에서 60px을 뺀 만큼
        height: "100%",
        background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))",
        zIndex: 0,
    },

    // 3) h1 텍스트에 반투명 박스 + 전체 뒤 배경 블러
    "& h1": {
        position: "relative",
        zIndex: 2,
        margin: 0,
        padding: "0 24px",
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
    },

    // 4) h1 왼쪽 부분만 블러를 더 강하게
    "& h1::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "40px", // 왼쪽 40px 영역
        height: "100%",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 1,
    },

    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
});
