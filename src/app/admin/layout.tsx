import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
import AdminNavbar from "./AdminNavbar";

export const metadata: Metadata = {
    title: "Admin",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <AdminNavbar />
            {children}
        </ClerkProvider>
    );
};

export default Layout;
