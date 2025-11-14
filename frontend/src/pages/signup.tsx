import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const onSubmit = async (data: object) => {
    try {
      const res = await api.post("/auth/signup", data);
      setToken(res.data.token);
      navigate("/todos");
    } catch (err: unknown) {
        let message = "Signup failed";
        if (err instanceof Error) {
            message = err.message;
        }else if (typeof err === "object" && err !== null && "response" in err) {
        const e = err as { response?: { data?: { message?: string } } };
        message = e.response?.data?.message ?? message;
      }
      alert(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("email")} placeholder="Email" className="w-full p-2 border" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="w-full p-2 bg-green-600 text-white">Create account</button>
      </form>
    </div>
  );
}
