import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Hirredd Jobs",
        template: "%s | Hirredd Jobs ",
    },
    description: "Find your dream job on Hirredd",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-w-[350px] pb-5`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
