import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { jobFilterValues } from "@/lib/validationSchema";
import { Metadata } from "next";

interface PageProps {
    searchParams: {
        query?: string;
        type?: string;
        location?: string;
        remote?: string;
        onsite?: string;
        hybrid?: string;
        page?: string;
    };
}
const getTitle = ({
    query,
    type,
    location,
    remote,
    onsite,
    hybrid,
}: jobFilterValues) => {
    const titlePrefix = query
        ? `${query} Jobs`
        : type
          ? `${type} Developer Jobs`
          : remote
            ? `Remote Developer Jobs`
            : hybrid
              ? `Hybrid Developer Jobs`
              : onsite
                ? `On-site Developer Jobs`
                : "All Developer Jobs";

    const tiitleSuffix = location ? ` in ${location}` : "";
    return `${titlePrefix}${tiitleSuffix}`;
};

export const generateMetadata = ({
    searchParams: { query, type, location, remote, onsite, hybrid },
}: PageProps): Metadata => {
    return {
        title: `${getTitle({
            query,
            type,
            location,
            remote: remote === "true",
            onsite: onsite === "true",
            hybrid: hybrid === "true",
        })}`,
    };
};
export default async function Home({
    searchParams: { query, type, location, remote, onsite, hybrid, page },
}: PageProps) {
    const filterValues: jobFilterValues = {
        query,
        type,
        location,
        remote: remote === "true",
        onsite: onsite === "true",
        hybrid: hybrid === "true",
    };
    return (
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
            <div className="space-y-5 text-center">
                <H1>{getTitle(filterValues)}</H1>
                <p className="text-muted-foreground">Find your dream job</p>
            </div>
            <section className="flex flex-col gap-4 md:flex-row">
                <JobFilterSidebar defaultValues={filterValues} />
                <JobResults
                    filterValues={filterValues}
                    page={page ? parseInt(page) : undefined}
                />
            </section>
        </main>
    );
}
