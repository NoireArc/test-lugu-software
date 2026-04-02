import api from "@/lib/api";
import { Post } from "@/interface/post";

export const getPosts = async (): Promise<Post[]> => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async (data: Omit<Post, "id">) => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const updatePost = async (id: number, data: Partial<Post>) => {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
