import { z } from "zod";
import { LoginSchema } from "./loginSchema";

export const RegisterSchema = LoginSchema.extend({
  name: z.string({ required_error: "Cho tôi biết tên của bạn" }),
  dateOfBirth: z.string().min(1,"Hãy nhập ngày sinh"),
  checkPassword: z.string()
}).refine(
  (data) => data.password === data.checkPassword,
  {
    message: "Mật khẩu xác nhận không khớp",
    path: ["checkPassword"],
  }
)

export type RegisterFromData = z.infer<typeof RegisterSchema>;