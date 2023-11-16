import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Metadata } from "next";
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const CreateIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Create New Issue",
  description: "Create new issue",
};

export default CreateIssuePage;
