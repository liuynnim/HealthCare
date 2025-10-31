import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty("Tên đăng nhập không được bỏ trống")
    .min(3, "Tên đăng nhập ít nhất 3 ký tự"),
  password: z
    .string()
    .nonempty("Mật khẩu không được bỏ trống")
    .min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
