import { boolean } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { jobTypes, locationTypes } from "@/lib/jobTypes";
import { Button } from "./ui/button";
import { jobFilterSchema, jobFilterValues } from "@/lib/validationSchema";
import { redirect } from "next/navigation";
import React from "react";
import FormSubmitButton from "./FormSubmitButton";
import { da } from "date-fns/locale";

interface JobFilterSidebarProps {
    defaultValues: jobFilterValues;
}

const filterJobs = async (formData: FormData) => {
    "use server";
    const values = Object.fromEntries(formData.entries());
    const { query, type, location, remote, onsite, hybrid } =
        jobFilterSchema.parse(values);
    const searchParams = new URLSearchParams({
        ...(query && { query: query.trim() }),
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: "true" }),
        ...(onsite && { onsite: "true" }),
        ...(hybrid && { hybrid: "true" }),
    });
    redirect(`/?${searchParams}`);
};

const JobFilterSidebar = async ({ defaultValues }: JobFilterSidebarProps) => {
    const distinctLocations = (await prisma.job
        .findMany({
            where: {
                approved: true,
            },
            select: { location: true },
            distinct: ["location"],
        })
        .then((locations) =>
            locations.map(({ location }) => location).filter(Boolean)
        )) as string[];

    return (
        <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[200px]">
            <form action={filterJobs} key={JSON.stringify(defaultValues)}>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="query">Search</Label>
                        <Input
                            id="query"
                            name="query"
                            placeholder="Title, company, etc."
                            defaultValue={defaultValues.query || ""}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            id="type"
                            name="type"
                            defaultValue={defaultValues.type || ""}
                        >
                            <option value="">All types</option>
                            {jobTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Select
                            id="location"
                            name="location"
                            defaultValue={defaultValues.location || ""}
                        >
                            <option value="">All locations</option>
                            {distinctLocations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        {locationTypes.map((locationType) => (
                            <React.Fragment key={locationType}>
                                <input
                                    type="checkbox"
                                    name={locationType.toLowerCase()}
                                    id={locationType}
                                    className="scale-125 accent-black"
                                    defaultChecked={
                                        locationType === "Hybrid"
                                            ? defaultValues.hybrid || false
                                            : locationType === "Remote"
                                              ? defaultValues.remote || false
                                              : locationType === "Onsite"
                                                ? defaultValues.onsite || false
                                                : false
                                    }
                                />
                                <label htmlFor={locationType}>
                                    {locationType}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>

                    <FormSubmitButton className="w-full">
                        Filter jobs
                    </FormSubmitButton>
                </div>
            </form>
        </aside>
    );
};

export default JobFilterSidebar;
