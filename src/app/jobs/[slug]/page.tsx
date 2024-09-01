import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobDetails from "@/components/JobDetails";
import { Button } from "@/components/ui/button";

interface SlugProps {
    params: {
        slug: string;
    };
}

// Cache the job data for
const getJob = cache(async (slug: string) => {
    const job = await prisma.job.findUnique({
        where: { slug },
    });

    if (!job) notFound();

    return job;
});

export async function generateStaticParams() {
    const jobs = await prisma.job.findMany({
        where: { approved: true },
        select: { slug: true },
    });
    return jobs.map(({ slug }) => slug);
}

export const generateMetadata = async ({
    params: { slug },
}: SlugProps): Promise<Metadata> => {
    const job = await getJob(slug);
    return {
        title: job.title,
    };
};

export const JobPage = async ({ params: { slug } }: SlugProps) => {
    const job = await getJob(slug);
    const { applicationEmail, applicationUrl } = job;
    const applicationLink = applicationEmail
        ? `mailto:${applicationEmail}`
        : applicationUrl;
    if (!applicationLink) {
        console.log("Job has no application Link or email");
        notFound();
    }
    return (
        <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-5 md:flex-row md:items-start">
            <JobDetails job={job} />
            <aside>
                <Button asChild>
                    <a href={applicationLink} className="w-40 md:w-fit">
                        Apply Now
                    </a>
                </Button>
            </aside>
        </main>
    );
};

export default JobPage;
