import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssuesTable, { IssuQuery, tableHeadersOrderValues } from "./IssuesTable";
import { Metadata } from "next";

const IssuesPage = async ({ searchParams }: { searchParams: IssuQuery }) => {
  const statusEnum = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const status = statusEnum.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = tableHeadersOrderValues.includes(searchParams.orderBy)
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
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={currentPage}
        itemCount={itemsCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - List",
  description: "View all project issues",
};

export default IssuesPage;
