import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInValidation } from "@/lib/Validation";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateAccount,
  useSignInAccount,
} from "@/lib/React-Query/queriesAndMutation";
import { useUserContext } from "@/Context/AuthContext";
const SignInForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();
  const { mutateAsync: singInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const session = await singInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ title: "Sign In Failed, Please Try Again" });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign Up Failed, Please Try Again" });
    }
  }
  return (
    <Form {...form}>
      <div className="smw-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="Logo" />
        <h2 className="h23-bold md:h2-bold pt-5 sm:pt-12">
          Login To Your Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          Welcome Back! Please Enter Your Account
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2 ">
                <Loader />
                Loading
              </div>
            ) : (
              "Log In"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't Have An Account ?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
