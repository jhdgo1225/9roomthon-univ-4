import { style } from "@vanilla-extract/css";

export const name = style({
    color: "#f7f7f7",
    fontSize: "14px",
    padding: "6px 0 2px 0",
});

export const status = style({
    display: "block",
    color: "#f7f7f7",
    fontSize: "11px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

export const profileText = style({
    padding: "0 5px",
    paddingTop: "7px",
    width: "99px",
});
