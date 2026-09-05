import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAuthStore from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [username, setUsername] =
    useState<string>("");

  function handleLogin(): void {
    if (!username.trim()) {
      return;
    }

    // Mock token para sa activity
    login("mock-token-123");

    navigate("/");
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-xl bg-white p-8 shadow-md dark:bg-slate-900">

        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
          Login
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Login to your Peer Tutoring account.
        </p>

        <div className="mt-6">
          <Label
            htmlFor="username"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            Username
          </Label>

          <Input
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter your username"
            className="mt-2 w-full"
          />
        </div>

        <Button
          type="button"
          onClick={handleLogin}
          className="mt-5 w-full bg-blue-600 font-medium text-white hover:bg-blue-700"
        >
          Login
        </Button>

      </div>
    </div>
  );
}

export default LoginPage;