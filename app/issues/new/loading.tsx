import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";
import React from "react";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1.5rem" className="mb-2" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
