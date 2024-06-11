"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem(
      "cold-user",
      JSON.stringify({ email: email, password: password })
    );
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-card p-8 rounded shadow-md w-full max-w-2xl mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Steps to Obtain Google App Password
        </h2>
        <p className="text-center mb-4">
          Follow these steps to generate your Google App Password:
        </p>
        <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col items-center">
            <Image
              src="/step-1.png"
              alt="Step 1"
              width={200}
              height={100}
              className="rounded"
            />
            <p className="text-center mt-2 text-sm">
              Step 1: Navigate to Security settings in your Google Account.
            </p>
          </div>
          <div className="flex flex-col items-center pt-2">
            <Image
              src="/step-2.png"
              alt="Step 2"
              width={200}
              height={100}
              className="rounded"
            />
            <p className="text-center mt-2 text-sm">
              Step 2: Enable 2-Step Verification.
            </p>
            <div className="flex flex-col items-center mt-2">
              <Image
                src="/step-3.png"
                alt="Step 3"
                width={200}
                height={100}
                className="rounded"
              />
              <p className="text-center mt-2 text-sm">
                Step 3: Search for "App Passwords".
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center pt-2">
            <Image
              src="/step-4.png"
              alt="Step 4"
              width={200}
              height={100}
              className="rounded"
            />
            <p className="text-center mt-2 text-sm">
              Step 4: Create a new app password for "cold_email".
            </p>
          </div>
          <div className="flex flex-col items-center pt-2">
            <Image
              src="/step-5.png"
              alt="Step 5"
              width={200}
              height={100}
              className="rounded"
            />
            <p className="text-center mt-2 text-sm">
              Step 5: Use the generated app password for login below.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">
          Login to ColdMailPro
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-background border border-muted rounded text-text"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-background border border-muted rounded text-text"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-text py-2 px-4 rounded hover:bg-secondary transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
