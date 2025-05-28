import { style } from "@vanilla-extract/css";

export const realGraphView = style({
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
});

export const champNode = style({
    position: "relative",
    width: "clamp(42px, calc(100% - 60vw), 80px)",
    height: "clamp(42px, calc(100% - 60vw), 80px)",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "50%",
    zIndex: "1",
    border: "1px solid #e4e4e4",
});

export const champNodeImg = style({
    width: "100%",
    height: "100%",
    objectFit: "cover",
});