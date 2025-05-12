import { style } from "@vanilla-extract/css";

export const userMenuBtn = style({
    fontSize: "16px",
    color: "white",
    padding: "7px 12px",
    marginRight: "9px",
    background: "#23282d",
    border: "1px solid #c9b77c",
    "@media": {
        "(min-width: 491px) and (max-width: 634px)": { display: "none" },
        "(min-width: 720px)": {
            display: "none",
        },
    },
});
