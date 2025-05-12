import { style } from "@vanilla-extract/css";

export const userPart = style({
    display: "flex",
    justifyContent: "end",
    "@media": {
        "(max-width: 634px)": {
            justifyContent: "space-between"
        }
    },
});
