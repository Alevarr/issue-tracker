import Pagination from "./components/Pagination";

export default function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      currentPage={parseInt(page) || 1}
      itemCount={100}
      pageSize={10}
    />
  );
}
