"use client";

import { useState } from "react";
import { Post } from "@/interface/post";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Post, "id">) => void;
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    userId: 1,
    title: "",
    body: "",
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    setForm({ userId: 1, title: "", body: "" }); // reset
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Post</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Body"
          className="w-full mb-4 p-3 border rounded-lg min-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="w-full border py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
