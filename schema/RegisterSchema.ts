import { z } from "zod";
import { LoginSchema } from "./loginSchema";

export const RegisterSchema = LoginSchema.extend({
  f_name: z.string({ required_error: "Cho tôi biết tên của bạn" }),
  l_name: z.string({ required_error: "Cho tôi biết tên của bạn" }),
  email: z.string().email("Hãy điền email của bạn"),
  checkPassword: z.string()
}).refine(
  (data) => data.password === data.checkPassword,
  {
    message: "Mật khẩu xác nhận không khớp",
    path: ["checkPassword"],
  }
)

export type RegisterFromData = z.infer<typeof RegisterSchema>;