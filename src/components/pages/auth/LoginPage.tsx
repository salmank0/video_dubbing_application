"use client";
import React, { use, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/common/Input";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Toast from "@/components/common/Toast";

interface LoginType {
  emailOrPhone: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [display, setDisplay] = useState<ResponseMessage>({
    status: false,
    message: "",
  });
  const { user, setUser } = useAppContext();
  const [formData, setFormData] = useState<LoginType>({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginType>({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e: any) => {
    console.log({ target: e.target });
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateUser = (
    emailOrPhone: string,
    password: string
  ): ResponseMessage => {
    if (!user || !user.email || !user.phone || !user.password)
      return { status: false, message: "User not found" };
    if (emailOrPhone !== user.email && emailOrPhone !== user.phone)
      return { status: false, message: "Invalid email or phone" };

    const isUserAuthenticated = bcrypt.compareSync(password, user.password);
    console.log("isUserAuthenticated:", isUserAuthenticated);

    console.log("user:", user);
    return {
      status: isUserAuthenticated,
      message: isUserAuthenticated
        ? "User authenticated"
        : "Incorrect password",
      data: isUserAuthenticated
        ? jwt.sign(
            { id: user.id, email: user.email, phone: user.phone },
            "SALMAN"
          )
        : undefined,
    };
  };

  const validateForm = (): LoginType => {
    let newErrors: LoginType = { emailOrPhone: "", password: "" };
    if (!formData.emailOrPhone)
      newErrors.emailOrPhone = "Email or Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (!newErrors.emailOrPhone && !newErrors.password) {
      console.log("Login attempted with:", formData);
      if (!user)
        return setDisplay({ status: false, message: "User not found" });
      const response = validateUser(formData.emailOrPhone, formData.password);
      console.log("Login response:", response);
      setDisplay(response);
      if (response.status) {
        const updatedUser: User = {
          ...user,
          token: response.data,
          isLoggedIn: true,
        };
        setUser(updatedUser);
        setTimeout(() => {
          router.push("/videos");
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-2 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/app_logo.png"
          alt="App Logo"
          width={144}
          height={144}
          className="mx-auto w-64 h-64"
        />
        <h2 className="mt-2 text-center text-3xl font-extrabold text-text">
          Sign in to DubStudio Pro
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {display && display.message && (
              <Toast
                type={display.status ? "success" : "error"}
                message={display.message}
              />
            )}
            <Input
              label="Email or Phone"
              error={errors.emailOrPhone}
              onChange={handleChange}
              id="emailOrPhone"
              name="emailOrPhone"
              type="text"
              value={formData.emailOrPhone}
            />

            <Input
              label="Password"
              error={errors.password}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              value={formData.password}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-opacity-80"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
