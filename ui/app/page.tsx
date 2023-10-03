"use client";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import styles from "./styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();

  const [logoutError, setLogoutError] = useState("");

  const { data: user, isLoading } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher
  );

  const logoutHandler = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        { withCredentials: true }
      );
      router.push("/auth/login");
    } catch (e: any) {
      setLogoutError(e.message);
    }
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (user) {
    return (
      <div className="main">
        <p>{logoutError}</p>
        <h1>Welcome! {user.name}</h1>
        <button onClick={logoutHandler}>logout</button>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>Welcome</h1>
      <div className="sub">
        <span>Login here...</span>
        <a href="/auth/login">Login</a>
      </div>
      <div className="sub">
        <span>Don't have and account?</span>
        <a href="/auth/register">Register now</a>
      </div>
    </div>
  );
}
