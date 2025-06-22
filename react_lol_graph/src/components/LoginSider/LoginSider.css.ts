import { style } from "@vanilla-extract/css";

export const loginSider = style({
    width: "100%",
    height: "100vh",
    background: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media": {
        "screen and (min-width: 1201px) and (max-width: 1566px)": {
            width: "400px",
            flexShrink: 0,
        },
        "screen and (min-width: 1567px)": {
            width: "25%",
            minWidth: "400px",
            flexShrink: 1,
        },
    },
});
