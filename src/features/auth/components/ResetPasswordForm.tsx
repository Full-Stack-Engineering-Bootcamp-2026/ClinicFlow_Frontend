import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const resetSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: ResetFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label className="block text-sm font-medium mb-1">
          Old Password
        </label>
        <input
          type="password"
          {...register("oldPassword")}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          New Password
        </label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90 transition"
      >
        Reset Password
      </button>
    </form>
  );
}