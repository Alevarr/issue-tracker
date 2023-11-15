import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

export type PostIssueBody = z.infer<typeof issueSchema>
export type PatchIssueBody = z.infer<typeof patchIssueSchema>
