import { style } from "@vanilla-extract/css";

export const gamePart = style({
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: "0 15px",
    fontSize: "0.8rem",
    color: "#c9b77c",
    "@media": {
        "(max-width: 634px)": {
            justifyContent: "space-between",
            borderBottom: "1.5px solid #c9b77c",
        },
    },
});
