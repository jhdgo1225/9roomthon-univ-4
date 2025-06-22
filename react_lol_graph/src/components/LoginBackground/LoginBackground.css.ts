import { style } from "@vanilla-extract/css";

export const loginBackground = style({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media": {
        "(max-width: 1201px)": {
            display: "none",
        },
    },
});

export const loginBackgroundImg = style({
    width: "100%",
    maxWidth: "1166px",
    height: "auto",
});
