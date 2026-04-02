"use client";

import { useEffect, useState } from "react";
import { Post } from "@/interface/post";
import {
  getPosts,
  deletePost,
  createPost,
  updatePost,
} from "@/services/postServices";

import CreatePostModal from "./createPost";
import UpdatePostModal from "./updatePost";
import DeleteConfirmModal from "./deletePost";

export default function PostTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 🔍 search + pagination state
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const data = await getPosts();
    setPosts(data.slice(0, 50)); // ambil lebih banyak biar pagination keliatan
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (data: Omit<Post, "id">) => {
    const created = await createPost(data);
    setPosts([created, ...posts]);
  };

  const handleUpdate = async (data: Post) => {
    const updated = await updatePost(data.id, data);
    setPosts(posts.map((p) => (p.id === data.id ? updated : p)));
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deletePost(deleteId);
    setPosts(posts.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.body}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Posts</h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search title or body..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Body</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPosts.map((post) => (
              <tr
                key={post.id}
                className="border-t hover:bg-gray-50 text-sm transition"
              >
                <td className="p-3">{post.id}</td>

                <td className="p-3 font-medium max-w-50 truncate">
                  {post.title}
                </td>

                <td className="p-3 text-gray-600 max-w-75 truncate">
                  {post.body}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setIsEditOpen(true);
                      }}
                      className="px-3 py-1 text-sm bg-yellow-400 rounded-md hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedPosts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages || 1}
        </p>

        <div className="flex gap-2 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <UpdatePostModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdate}
        initialData={selectedPost}
      />

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
