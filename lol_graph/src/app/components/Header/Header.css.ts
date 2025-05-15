import { style, StyleRule } from "@vanilla-extract/css";

export const header = style({
    display: "flex",
    width: "100vw",
    background: "#001620",
    "@media": {
        "(max-width: 634px)": {
            flexDirection: "column",
            alignItems: "stretch",
            height: "120px",
        },
        "(min-width: 635px)": {
            justifyContent: "space-between"
        }
    },
    "& > div": {
        flex: 1,
    },
} as StyleRule);
