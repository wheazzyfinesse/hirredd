import { authMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();
export default authMiddleware();

export const config = {
    matcher: ["/(admin)(.*)"],
};
