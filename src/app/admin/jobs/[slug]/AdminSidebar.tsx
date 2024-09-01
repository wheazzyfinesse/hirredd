"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "./actions";
interface AdminSidebarProps {
    job: Job;
}

const AdminSidebar = ({ job }: AdminSidebarProps) => {
    return (
        <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
            {job.approved ? (
                <span className="py-1 text-center text-green-500">
                    Approved
                </span>
            ) : (
                <ApprovedSubmissionButton jobId={job.id} />
            )}

            <DeleteJobButton jobId={job.id} />
        </aside>
    );
};

export default AdminSidebar;

interface AdminButtonProps {
    jobId: number;
}

const ApprovedSubmissionButton = ({ jobId }: AdminButtonProps) => {
    const [formstate, formAction] = useFormState(approveSubmission, undefined);
    return (
        <form action={formAction} className="space-y-1">
            <input hidden name="jobId" value={jobId} />
            <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
                Approve
            </FormSubmitButton>
            {formstate?.error && (
                <p className="text-sm text-red-500">{formstate.error}</p>
            )}
        </form>
    );
};
const DeleteJobButton = ({ jobId }: AdminButtonProps) => {
    const [formstate, formAction] = useFormState(deleteJob, undefined);
    return (
        <form action={formAction} className="space-y-1">
            <input hidden name="jobId" value={jobId} />
            <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
                Delete
            </FormSubmitButton>
            {formstate?.error && (
                <p className="text-sm text-red-500">{formstate.error}</p>
            )}
        </form>
    );
};
