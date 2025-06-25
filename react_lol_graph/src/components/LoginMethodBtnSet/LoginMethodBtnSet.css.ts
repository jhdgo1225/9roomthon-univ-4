import { style } from "@vanilla-extract/css";

export const loginMethodBtn = style({
    padding: "8px 30px",
	borderRadius: "10px",
	width: "130px",
	background: "none",
	color: "#5e5e5e",
	fontWeight: "800",
	transition: "background 0.5s",
    selectors: {
        "&[data-clicked='true']": {
            background: "#d7d7d7",
			color: "#212121"
        },
    },
});

export const loginMethodBtnSet = style({
    padding: "10px",
    borderRadius: "15px",
	background: "#f0f0f0"
});
