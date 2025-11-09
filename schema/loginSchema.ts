import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được bỏ trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .nonempty("Mật khẩu không được bỏ trống")
    .min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
