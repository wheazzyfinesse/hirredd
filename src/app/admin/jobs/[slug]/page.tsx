import NotFound from "@/app/not-found";
import JobDetails from "@/components/JobDetails";
import prisma from "@/lib/prisma";
import AdminSidebar from "./AdminSidebar";

interface PageProps {
    params: {
        slug: string;
    };
}
const AdminJobPage = async ({ params: { slug } }: PageProps) => {
    const job = await prisma.job.findUnique({
        where: { slug },
    });

    if (!job) NotFound();

    return (
        <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <JobDetails job={job} />
            <AdminSidebar job={job} />
        </main>
    );
};

export default AdminJobPage;
