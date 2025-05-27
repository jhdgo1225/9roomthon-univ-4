import { style } from "@vanilla-extract/css";

export const userMenuListItem = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
});

export const userMenuList = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: "1",
    "@media": {
        "(max-width: 490px)": {
            position: "absolute",
            bottom: "-30px",
            right: "9px",
            width: "200px",
            background: "#23282d",
        },
        "(min-width: 635px) and (max-width: 1024px)": {
            position: "absolute",
            bottom: "-30px",
            right: "9px",
            width: "200px",
            background: "#23282d",
        },
        "(min-width: 1025px)": {
            width: "220px",
            marginRight: "8px",
        },
    },
});
