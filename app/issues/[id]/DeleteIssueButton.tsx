"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const onDelete = async () => {
    try {
      setDeletionInProgress(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError(true);
    }
    setDeletionInProgress(false);
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            className="delete-button"
            disabled={deletionInProgress}
          >
            Delete Issue {deletionInProgress && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure to delete the issue? This actions cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={onDelete} className="delete-button">
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Could not complete deletion.
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            mt="3"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
