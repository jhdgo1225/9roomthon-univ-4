import { style } from "@vanilla-extract/css";

export const graphView = style({
	position: "relative",
	width: "100%",
  	height: "min(100vh)",
	padding: "2rem"
})

export const content = style({
	position: "relative",
  	zIndex: 1, // 배경 위에 표시
})