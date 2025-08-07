import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import API from "../services/api";

export default function PasswordUpdateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await API.put("/users/update-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      console.error("Password update failed:", error);
      console.log("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Failed to update password";
      toast.error(errorMessage.includes("Current password")
        ? errorMessage
        : "Password update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input
          type="password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
          autoComplete="current-password"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
              message: "Only lowercase letters, numbers, and special characters allowed",
            },
          })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
          autoComplete="new-password"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
