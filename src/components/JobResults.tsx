import React from "react";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { jobFilterValues } from "@/lib/validationSchema";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobResultProps {
    filterValues: jobFilterValues;
    page?: number;
}
const JobResults = async ({ filterValues, page = 1 }: JobResultProps) => {
    const { query, type, location, remote, hybrid, onsite } = filterValues;

    const jobsPersPage = 6;
    const skip = (page - 1) * jobsPersPage;

    const searchString = query
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ");

    const searchFilter: Prisma.JobWhereInput = searchString
        ? {
              OR: [
                  { title: { search: searchString } },
                  { companyName: { search: searchString } },
                  { type: { search: searchString } },
                  { locationType: { search: searchString } },
                  { location: { search: searchString } },
              ],
          }
        : {};

    const locationTypeFilters: Prisma.JobWhereInput[] = [];

    if (remote) locationTypeFilters.push({ locationType: "Remote" });
    if (hybrid) locationTypeFilters.push({ locationType: "Hybrid" });
    if (onsite) locationTypeFilters.push({ locationType: "On-site" });

    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type ? { type } : {},
            // type ? { type: { contains: type, mode: "insensitive" } } : {},
            location ? { location } : {},
            locationTypeFilters.length > 0 ? { OR: locationTypeFilters } : {}, // OR condition for locationType, only if there are any

            { approved: true },
        ],
    };
    const jobsPromise = prisma?.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: jobsPersPage,
        skip,
    });

    const countPromise = prisma.job.count({ where });

    const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);
    return (
        <div className="grow space-y-4">
            {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
                    <JobListItem job={job} />
                </Link>
            ))}
            {jobs.length === 0 && (
                <p className="m-auto text-center">
                    No jobs found, Try adjusting your search filters
                </p>
            )}
            {jobs.length > 0 && (
                <Pagination
                    totalPages={Math.ceil(totalResults / jobsPersPage)}
                    currentPage={page}
                    filterValues={filterValues}
                />
            )}
        </div>
    );
};

export default JobResults;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    filterValues: jobFilterValues;
}
const Pagination = ({
    currentPage,
    totalPages,
    filterValues: { query, type, location, remote, hybrid, onsite },
}: PaginationProps) => {
    const generatePageLink = (page: number) => {
        const searchParams = new URLSearchParams({
            ...(query && { query: query.trim() }),
            ...(type && { type }),
            ...(location && { location }),
            ...(remote && { remote: "true" }),
            ...(onsite && { onsite: "true" }),
            ...(hybrid && { hybrid: "true" }),
            page: page.toString(),
        });
        return `?${searchParams.toString()}`;
    };

    return (
        <div className="flex justify-between">
            <Link
                className={cn(
                    "flex items-center gap-2 font-semibold",
                    currentPage <= 1 && "invisible"
                )}
                href={generatePageLink(currentPage - 1)}
            >
                <ArrowLeft size={16} />
                Previous Page
            </Link>
            <span>
                page {currentPage} of {totalPages}
            </span>
            <Link
                className={cn(
                    "flex items-center gap-2 font-semibold",
                    currentPage >= totalPages && "invisible"
                )}
                href={generatePageLink(currentPage + 1)}
            >
                Next Page
                <ArrowRight size={16} />
            </Link>
        </div>
    );
};
