import { useRouter } from "next/router";
import Link from "next/link";

import BookList from "@/components/BookList";
import Button from "@/components/Button";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex bg-white shadow p-4">
        <h1 className="text-2xl font-semibold">Book Management Dashboard</h1>
        <Button
          className="bg-red-500 hover:bg-red-600 ml-2"
          // @ts-ignore
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/signin");
          }}
        >
          Sign out
        </Button>
      </header>
      <Link href="add-book">Add Book</Link>
      <main className="container mx-auto mt-6">
        {/* Display your book list here */}
        <BookList />
        {/* Create, Update, Delete forms/components */}
      </main>
    </div>
  );
};

export default Dashboard;
