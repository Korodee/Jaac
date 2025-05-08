import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/layout/CustomCursor";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "JAAC - Services de Soutien Psychologique",
    description:
        "Services professionnels de soutien psychologique et de counseling pour les particuliers et les entreprises.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    async
                    src="https://pay.google.com/gp/p/js/pay.js"
                ></script>
            </head>
            <body className={inter.className}>
                <CustomCursor />
                <LayoutWrapper>
                    <main>{children}</main>
                </LayoutWrapper>
            </body>
        </html>
    );
}
