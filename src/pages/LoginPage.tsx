import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="rounded-xl bg-white p-8 shadow-md">

        <h1 className="text-3xl font-bold text-blue-700">
          Login
        </h1>

        <p className="mt-2 text-gray-600">
          Login to your Peer Tutoring account.
        </p>

        <label
          htmlFor="username"
          className="mt-6 block font-medium text-gray-700"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          placeholder="Enter your username"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="button"
          onClick={handleLogin}
          className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default LoginPage;