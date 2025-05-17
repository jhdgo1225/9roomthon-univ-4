import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	try {
        const filePath = path.join(
            process.cwd(),
            "public",
            "json",
            "champs.json"
        );
        const fileData = fs.readFileSync(filePath, "utf8");
        return NextResponse.json(JSON.parse(fileData));
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`File Open Error: ${err.message}`);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}