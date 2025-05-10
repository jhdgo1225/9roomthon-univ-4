import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "9roomthon univ - Kyeongin Chapter Union FE Project Study team 2",
    description: "Relation Graphs of LOL Champions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
