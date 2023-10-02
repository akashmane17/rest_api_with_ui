"use client";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import styles from "./styles/Home.module.css";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

export default function Home() {
  const { data, error, isLoading } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (data) {
    return (
      <div className="main">
        <h1>Welcome! {data.name}</h1>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>Welcome</h1>
      <div>
        <span>Login here...</span>
        <a href="/auth/login">Login</a>
      </div>
      <div>
        <span>Don't have and account?</span>
        <a href="/auth/register">Register now</a>
      </div>
    </div>
  );
}
