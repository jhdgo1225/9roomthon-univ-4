import { style, keyframes } from "@vanilla-extract/css";

export const realGraphView = style({
    position: "relative",
    width: "100%",
    height: "780px",
    overflow: "hidden",
    zIndex: "2",
});

const showKeyframes = keyframes({
    "0%": {
        display: "none"
    },
    "100%": {
        display: "flex"
    },
});

export const showAnimation = style({
    animation: `${showKeyframes} 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: "display",
});


