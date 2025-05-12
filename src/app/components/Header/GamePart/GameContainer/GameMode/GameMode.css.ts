import { style } from "@vanilla-extract/css";

export const gameMode = style({
    fontWeight: "700",
    "& > span:first-child": {
        marginRight: "8px",
    },
});
