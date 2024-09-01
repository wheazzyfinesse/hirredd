"use client";
import LocationInput from "@/components/locationInput";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/jobTypes";
import { createJobSchema, createJobValues } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";
import { XCircleIcon } from "lucide-react";
import { createJobPosting } from "./actions";

const NewJobForm = () => {
    const form = useForm<createJobValues>({
        resolver: zodResolver(createJobSchema),
    });

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (values: createJobValues) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });
        try {
            await createJobPosting(formData);
        } catch (error) {
            console.log(error);
            alert("something went wrong!");
        }
    };
    return (
        <main className="m-auto my-10 max-w-3xl space-y-10">
            <div className="space-y-5 text-center">
                <H1>Find your perfect developer</H1>
                <p className="text-muted-foreground">
                    Create a job listing for thousands of job seekers to see and
                    get your job done faster.
                </p>
            </div>
            <div className="space-y-6 rounded-lg border p-4">
                <div>
                    <h2 className="font-semibold">Job details</h2>
                    <p className="text-muted-foreground">
                        Provide a job description and details
                    </p>
                </div>
                <Form {...form}>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g, frontend developer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job type</FormLabel>
                                    <FormControl>
                                        <Select {...field} defaultValue="">
                                            <option value="" hidden>
                                                Select a job type
                                            </option>
                                            {jobTypes.map((jobType) => (
                                                <option
                                                    key={jobType}
                                                    value={jobType}
                                                >
                                                    {jobType}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="companyLogo"
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            render={({ field: { value, ...fieldValues } }) => (
                                <FormItem>
                                    <FormLabel>Company Logo</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...fieldValues}
                                            type="file"
                                            accept="image/"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                fieldValues.onChange(file);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="locationType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (
                                                    e.currentTarget.value ===
                                                    "Remote"
                                                ) {
                                                    trigger("location");
                                                }
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" hidden>
                                                Select a location type
                                            </option>
                                            {locationTypes.map(
                                                (locationType) => (
                                                    <option
                                                        key={locationType}
                                                        value={locationType}
                                                    >
                                                        {locationType}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Office location</FormLabel>
                                    <FormControl>
                                        <LocationInput
                                            onLocationSelected={field.onChange}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    {watch("location") && (
                                        <div className="flex items-center justify-between py-1">
                                            <span>{watch("location")}</span>
                                            <XCircleIcon
                                                size={16}
                                                className="cursor-pointer text-red-500"
                                                onClick={() =>
                                                    setValue("location", "", {
                                                        shouldValidate: true,
                                                    })
                                                } // Clear the field when clicked
                                            />
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="applicationEmail">
                                How to apply
                            </Label>
                            <div className="flex justify-between">
                                <FormField
                                    control={control}
                                    name="applicationEmail"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Input
                                                        type="email"
                                                        placeholder="Email"
                                                        id="applicationEmail"
                                                        {...field}
                                                    />
                                                    <span className="mx-2">
                                                        or
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="applicationUrl"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="website link"
                                                    id="applicationUrl"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        trigger(
                                                            "applicationEmail"
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <Label
                                        onClick={() => setFocus("description")}
                                    >
                                        Job Description
                                    </Label>
                                    <FormControl>
                                        <RichTextEditor
                                            ref={field.ref}
                                            onChange={(draft) =>
                                                field.onChange(
                                                    draftToMarkdown(draft)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton type="submit" loading={isSubmitting}>
                            Submit
                        </LoadingButton>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default NewJobForm;
