import prisma from "@/prisma/client";
import { Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <>
      <Text as="p">{issue.title}</Text>
      <Text as="p">{issue.description}</Text>
      <Text as="p">{issue.status}</Text>
      <Text as="p">{issue.createdAt.toDateString()}</Text>
    </>
  );
};

export default IssueDetailsPage;
