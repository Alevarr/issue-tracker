"use client";

import { Issue, Status } from "@prisma/client";
import { Flex, RadioGroup, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const StatusRadio = ({ issue }: Props) => {
  const router = useRouter();
  const sendStatus = (status: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status,
      })
      .then(() => router.refresh())
      .catch(() => toast.error("Could not apply changes."));
  };

  return (
    <>
      <RadioGroup.Root defaultValue={issue.status} onValueChange={sendStatus}>
        <Flex
          gap={{ initial: "4", sm: "1" }}
          direction={{ initial: "row", sm: "column" }}
        >
          {radios.map((radio) => (
            <Flex gap="1" align="center">
              <RadioGroup.Item value={radio.status} />
              <Text>{radio.label}</Text>
            </Flex>
          ))}
        </Flex>
      </RadioGroup.Root>
      <Toaster />
    </>
  );
};

const radios: {
  label: string;
  status: Status;
}[] = [
  { label: "Open", status: "OPEN" },
  { label: "In Progress", status: "IN_PROGRESS" },
  { label: "Closed", status: "CLOSED" },
];

export default StatusRadio;
