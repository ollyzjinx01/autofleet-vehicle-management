import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { notifySuccess, notifyError } from "../utils/notifications"; // ⭐ ADDED

const schema = z.object({
  email: z.string().email("Enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Must contain at least one letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // ⭐ ADDED

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true); // ⭐ ADDED

    const success = login(data.email, data.password);

    if (success) {
      notifySuccess("Login successful!"); // ⭐ ADDED
      navigate("/", { replace: true });
    } else {
      notifyError("Invalid credentials"); // ⭐ ADDED
    }

    setLoading(false); // ⭐ ADDED
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded w-80 space-y-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Email */}
        <div>
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          disabled={loading} // ⭐ ADDED
          className={`w-full p-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}>
          {loading ? "Logging in..." : "Login"} {/* ⭐ ADDED */}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Use: test@test.com / Test@1234
        </p>
      </form>
    </div>
  );
}
