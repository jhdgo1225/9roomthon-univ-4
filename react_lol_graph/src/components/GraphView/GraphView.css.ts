import { style } from "@vanilla-extract/css";

export const graphView = style({
    position: "relative",
    width: "100%",
    height: "100vh",
});

export const content = style({
    position: "relative",
    zIndex: 1, // 배경 위에 표시
});
