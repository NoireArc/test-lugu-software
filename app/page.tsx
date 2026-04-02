import PostTable from "@/components/postTable";

export default function Home() {
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Post Table</h1>
      <PostTable />
    </div>
  );
}
