"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/common/Input";
import { useAppContext } from "@/context/AppContext";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { User } from "@/types";

const RegisterPage = () => {
  const router = useRouter();
  const { setUser } = useAppContext();
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUser(formData);
  }, [formData]);

  const hashPassword = (plainPassword: string) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
  };

  const validateForm = () => {
    const newErrors: User = { name: "", email: "", phone: "", password: "" };
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.phone &&
      !newErrors.password
    ) {
      console.log("Form submitted:", formData);
      const hashedPassword = hashPassword(formData.password);
      const newUser: User = {
        ...formData,
        password: hashedPassword,
        id: 1,
        isLoggedIn: false,
      };
      setUser(newUser);
      router.push("/login");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-background sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/app_logo.png"
          alt="App Logo"
          width={512}
          height={512}
          className="mx-auto "
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
          Register for DubStudio Pro
        </h2>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              value={formData?.name}
              onChange={handleChange}
              error={errors.name}
              id="name"
              name="name"
              type="text"
            />

            <Input
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              id="email"
              name="email"
              type="email"
            />

            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              id="phone"
              name="phone"
              type="text"
            />

            <Input
              label="Password"
              value={formData.password}
              error={errors.password}
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
            />

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Register
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
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/login"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
