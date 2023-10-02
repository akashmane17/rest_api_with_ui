"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// schema to validate user inputs
const createUserSchema = object({
  name: string().nonempty({
    message: "Name is required",
  }),
  password: string()
    .min(6, "Password should be 6 characters minimum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  })
    .email("Not a valid email")
    .nonempty({
      message: "Password is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

// creating type to pass it in useForm
type CreateUserInput = TypeOf<typeof createUserSchema>;

function Register() {
  const router = useRouter();

  const [registerError, setRegisterError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (values: CreateUserInput) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values
      );
      router.push("/");
    } catch (e: any) {
      setRegisterError(e.message);
    }
  };

  return (
    <>
      <p>{registerError}</p>
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          <p>{`${errors?.name?.message ? errors?.name?.message : ""}`}</p>
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

        <div className="form-element">
          <label htmlFor="passwordConfirmation">confirmPassword</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="confirm password"
            {...register("passwordConfirmation")}
          />
          <p>{`${
            errors?.passwordConfirmation?.message
              ? errors?.passwordConfirmation?.message
              : ""
          }`}</p>
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
