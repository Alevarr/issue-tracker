import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import IssueActions from "./IssueActions";
import { Link, StatusBadge } from "../../components";
import { Status } from "@prisma/client";

const IssuesPage = async ({
  searchParams: { status },
}: {
  searchParams: { status: Status };
}) => {
  const statusEnum = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const statusFilter = statusEnum.includes(status) ? status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: statusFilter },
  });
  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <StatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
