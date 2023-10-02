"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// schema to validate user inputs
const createSessionSchema = object({
  email: string().nonempty({
    message: "Name is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

// creating type to pass it in useForm
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function Login() {
  const router = useRouter();

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const onSubmit = async (values: CreateSessionInput) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      );
      router.push("/");
    } catch (e: any) {
      setLoginError(e.message);
    }
  };

  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="formBox">
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="user@example.com"
            {...register("email")}
          />
          <p>{`${errors?.email?.message ? errors?.email?.message : ""}`}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <p>{`${
            errors?.password?.message ? errors?.password?.message : ""
          }`}</p>
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
