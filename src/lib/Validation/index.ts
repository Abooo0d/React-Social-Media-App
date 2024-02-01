import * as z from "zod";
export const SignUpValidation = z.object({
  name:z.string().min(2,{message:'The Name Is Too Short "min 2 char"'}),
  username: z.string().min(2,{message:'The Username Is Too Short "min 2 char"'}),
  email:z.string().email({message:'Invalid Email'}),
  password:z.string().min(8,{message:'The Password is Too Short "min 8 char"'})
});
export const SignInValidation = z.object({
  email:z.string().email({message:'Invalid Email'}),
  password:z.string().min(8,{message:'The Password is Too Short "min 8 char"'})
});