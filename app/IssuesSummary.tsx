import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesSummary = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const containers: { label: string; count: number; status: Status }[] = [
    { label: "Open Issues", count: open, status: "OPEN" },
    { label: "In Progress Issues", count: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", count: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card>
          <Flex direction="column" gap="1">
            <Link
              href={"/issues/list?status=" + container.status}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
