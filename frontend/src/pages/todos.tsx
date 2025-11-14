import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Todos() {
  const navigate = useNavigate();
  const token = useAuthStore((s: { token: string | null }) => s.token);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);


  const todosQuery = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await api.get<Todo[]>("/todos");
      return res.data;
    },
    enabled: !!token,
  });


  const createMut = useMutation({
    mutationFn: async (payload: { title: string }) => {
      const res = await api.post<Todo>("/todos", payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });


  const toggleMut = useMutation({
    mutationFn: async (payload: { id: string; completed: boolean }) => {
      const res = await api.put<Todo>(`/todos/${payload.id}`, {
        completed: payload.completed,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });


  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/todos/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });


  const onAdd = () => {
    const text = title.trim();
    if (!text) return;
    createMut.mutate({ title: text });
    setTitle("");
  };


  const onAISuggest = async () => {
    if (!title.trim()) return;
    try {
      setAiLoading(true);
      const res = await api.post("/ai/suggest", { text: title });
      setTitle(res.data.suggested);
    } catch (err) {
      console.error(err);
      alert("AI error: Suggest failed");
    } finally {
      setAiLoading(false);
    }
  };

  const onAICategorize = async () => {
    if (!title.trim()) return;
    try {
      setAiLoading(true);
      const res = await api.post("/ai/categorize", { todo: title });
      alert("AI Result: " + res.data.analysis);
    } catch (err) {
      console.error(err);
      alert("AI error: Categorize failed");
    } finally {
      setAiLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border"
          placeholder="Enter todo..."
        />

        <button
          onClick={onAdd}
          className="p-2 bg-blue-600 text-white"
          disabled={createMut.isPending}
        >
          Add
        </button>

        <button
          onClick={onAISuggest}
          className="p-2 bg-purple-600 text-white"
          disabled={aiLoading}
        >
          {aiLoading ? "Thinking..." : "AI Suggest"}
        </button>

        <button
          onClick={onAICategorize}
          className="p-2 bg-green-600 text-white"
          disabled={aiLoading}
        >
          {aiLoading ? "Thinking..." : "AI Categorize"}
        </button>
      </div>

      {todosQuery.isLoading ? (
        <div>Loading...</div>
      ) : (
        todosQuery.data?.map((t) => (
          <div
            key={t._id}
            className="p-2 border-b flex items-center justify-between"
          >
            <div>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() =>
                  toggleMut.mutate({ id: t._id, completed: !t.completed })
                }
              />
              <span className={t.completed ? "line-through ml-2" : "ml-2"}>
                {t.title}
              </span>
            </div>
            <button
              onClick={() => deleteMut.mutate(t._id)}
              className="text-red-600"
              disabled={deleteMut.isPending}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
