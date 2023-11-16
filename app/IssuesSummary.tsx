import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = async ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; count: number; status: Status }[] = [
    { label: "Open Issues", count: open, status: "OPEN" },
    { label: "In Progress Issues", count: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", count: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.status}>
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
