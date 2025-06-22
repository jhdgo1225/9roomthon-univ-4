import { style } from "@vanilla-extract/css";

export const account = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "5px",
});

export const accountIssue = style({
    color: "#656565",
    letterSpacing: "0.8px",
    fontSize: "11px",
    fontWeight: "800",
});

export const version = style({
    color: "#b2b2b2",
    display: "block",
    letterSpacing: "0.8px",
    fontSize: "11px",
    fontWeight: "800",
});

export const signUpDivider = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
});

export const dividerChild = style({
    flex: "1 1 0",
});

export const dividerChildCenter = style([
    dividerChild,
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
    },
]);
