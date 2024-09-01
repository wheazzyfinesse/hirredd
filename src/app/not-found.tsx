import H1 from "@/components/ui/h1";
import React from "react";

const NotFound = () => {
    return (
        <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
            <H1 className="text-blue-300">404</H1>
            <H1>Not Found</H1>
            <p>Sorry, the page your are looking for does not exist!</p>
        </main>
    );
};

export default NotFound;
