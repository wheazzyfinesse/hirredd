import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
const Navbar = () => {
    return (
        <header className="shadow-sm">
            <nav className="m-auto flex max-w-5xl justify-between px-3 py-5">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src={logo}
                        width={40}
                        height={40}
                        alt="Hirredd jobs logo"
                    />
                    <span className="text-2xl font-bold tracking-tight">
                        Hirredd Jobs
                    </span>
                </Link>
                <Button asChild>
                    <Link href="/jobs/new">Post a job</Link>
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;
