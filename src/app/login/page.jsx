"use client";
import { authClient } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";

import { redirect } from "next/navigation";

import {
  FieldError,
  Form,
  Input,
  Label,
  Text,
  TextField,
} from "react-aria-components";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      redirect("/");
    }
    if (error) {
      alert("login failed");
    }
  };


    const handleWithGoogle = async () => {
      await authClient.signIn.social({
        provider: "google",
      });
    };
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div>
        <h2 className=" text-2xl font-bold">Login Your Account</h2>
      </div>
      <Card className="border p-5 border-slate-300">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              placeholder="Enter Your Email"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-1"
          >
            <Label className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
            <Text slot="description" className="text-xs text-gray-400">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Text>
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <div className="flex gap-2 justify-center">
            <Button
              className={"rounded-none w-full bg-cyan-500 text-white p-2"}
              type="submit"
            >
              Login
            </Button>
          </div>
        </Form>

        <div className="flex items-center gap-3 py-2">
          <hr className="flex-1 border-gray-400" />
          <span className="text-sm font-medium">Or SignUp With</span>
          <hr className="flex-1 border-gray-400" />
        </div>
        <div>
          <Button
            onClick={handleWithGoogle}
            className="w-full rounded-none cursor-pointer flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in With Google</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
