import prisma from "@/prisma/client";
import { Flex, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import React from "react";
import IssueActions from "./IssueActions";
import { Link, StatusBadge } from "../../components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

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

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}) => {
  const statusEnum = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const status = statusEnum.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = tableHeadersMap
    .map((header) => header.orderByValue)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const pageSize = 10;

  const currentPage = parseInt(searchParams.page) || 1;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const itemsCount = await prisma.issue.count({ where });
  return (
    <>
      <IssueActions />
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
      <Pagination
        currentPage={currentPage}
        itemCount={itemsCount}
        pageSize={pageSize}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
