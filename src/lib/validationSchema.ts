import { z } from "zod";
import { jobTypes, locationTypes } from "./jobTypes";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");
const companyLogoSchema = z
    .custom<File | undefined>()
    .refine((file) => {
        return (
            !file || (file instanceof File && file.type.startsWith("image/"))
        );
    }, "Must be an image file")
    .refine((file) => {
        return !file || file.size < 1024 * 1024 * 2;
    }, "File must be less than 2MB");

const applicationSchema = z
    .object({
        applicationEmail: z
            .string()
            .max(100)
            .email()
            .optional()
            .or(z.literal("")),
        applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
    })
    .refine((data) => data.applicationEmail || data.applicationUrl, {
        message: "Email or Url is required",
        path: ["applicationEmail"],
    });

const locationSchema = z
    .object({
        locationType: z
            .string()
            .refine(
                (value) => locationTypes.includes(value),
                "Invalid location type"
            ),
        location: z.string().max(100).optional(),
    })
    .refine(
        (data) =>
            !data.locationType ||
            data.locationType === "Remote" ||
            data.location,
        {
            message: "Location is required for onsite jobs",
            path: ["location"],
        }
    );

export const createJobSchema = z
    .object({
        title: requiredString.max(100),
        type: requiredString.refine(
            (value) => jobTypes.includes(value),
            "Invalid job type"
        ),
        companyName: requiredString.max(100),
        companyLogo: companyLogoSchema,
        salary: numericRequiredString.max(
            9,
            "Number can't be larger than 9 digits"
        ),
        description: z.string().max(5000).optional(),
    })
    .and(applicationSchema)
    .and(locationSchema);
export type createJobValues = z.infer<typeof createJobSchema>;

// export const updateJobSchema = createJobSchema.extend({
//     id: z.string().uuid("Invalid ID format").min(1, "Job ID is required"),
// });
// export type updateJobValues = z.infer<typeof updateJobSchema>;

export const jobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
    onsite: z.coerce.boolean().optional(),
    hybrid: z.coerce.boolean().optional(),
});
export type jobFilterValues = z.infer<typeof jobFilterSchema>;
