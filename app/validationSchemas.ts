import { z } from "zod";

export const issueSchema = z.object({
    title: z.string({errorMap: () => ({message: "Title is required."})}).min(1, "Title is required.").max(255, "Title is too long"),
    description: z.string({errorMap: () => ({message: "Description is required."})}).min(1, "Description is required.")
});
