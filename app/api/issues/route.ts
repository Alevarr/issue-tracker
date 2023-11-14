import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { IssueBody } from "../_interfaces/IssueBody";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
  if(!session)
    return NextResponse.json({}, {status: 401})

    const body: IssueBody = await request.json();

    const validation = issueSchema.safeParse(body);
    if(!validation.success) 
        return NextResponse.json(validation.error.errors, {status: 400})

    const newIssue = await prisma.issue.create({data: {title: body.title, description: body.description}})

    return NextResponse.json(newIssue, {status: 201})
}