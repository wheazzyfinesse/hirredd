import H1 from "@/components/ui/h1";
import React from "react";

const JobSumbitted = () => {
    return (
        <div className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
            <H1>Job Submitted</H1>
            <p>
                Thank you for submitting your job. Job listing under review,
                check back for approval status
            </p>
        </div>
    );
};

export default JobSumbitted;
