"use client";

import { useState, useEffect } from "react";
import { Post } from "@/interface/post";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Post) => void;
  initialData: Post | null;
}

export default function UpdatePostModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState({
    userId: 1,
    title: "",
    body: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        userId: initialData.userId,
        title: initialData.title,
        body: initialData.body,
      });
    }
  }, [initialData]);

  if (!isOpen || !initialData) return null;

  const handleSubmit = () => {
    onSubmit({ ...initialData, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Post</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Body"
          className="w-full mb-4 p-3 border rounded-lg min-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="w-full border py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
