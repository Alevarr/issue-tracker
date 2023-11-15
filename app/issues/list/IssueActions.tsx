import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FilterByStatus from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <FilterByStatus />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
