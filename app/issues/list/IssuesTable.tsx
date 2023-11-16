import { StatusBadge, Link } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, TableColumnHeaderCell, Flex } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssuQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssuQuery;
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {tableHeadersMap.map((header) => (
            <TableColumnHeaderCell
              key={header.orderByValue}
              className={header.className}
            >
              <Flex align="center" gap="1">
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: header.orderByValue,
                    },
                  }}
                >
                  {header.label}
                </NextLink>
                {header.orderByValue === searchParams.orderBy && (
                  <ArrowUpIcon />
                )}
              </Flex>
            </TableColumnHeaderCell>
          ))}
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
  );
};

const tableHeadersMap: {
  label: string;
  orderByValue: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", orderByValue: "title" },
  {
    label: "Status",
    orderByValue: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    orderByValue: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const tableHeadersOrderValues = tableHeadersMap.map(
  (header) => header.orderByValue
);

export default IssuesTable;
