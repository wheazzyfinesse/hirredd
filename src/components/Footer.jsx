import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">Hirredd Jobs</h3>
                        <p className="text-sm text-muted-foreground">
                            Connecting talents with opportunity
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <Link href="/about" className="hover:underline">
                            About us
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            Contact
                        </Link>
                        <Link href="/terms" className="hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Hirredd Jobs. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
