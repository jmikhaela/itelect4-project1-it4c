import { Link, useParams } from "react-router-dom";

import type { User } from "../types/index";

function UserProfilePage() {
  const { id } = useParams<{ id: string }>();

  const users: User[] = [
    {
      id: 1,
      name: "Janna Alcantara",
      email: "janna@example.com",
      role: "tutor",
      isActive: true,
    },
  ];

  const user = users.find(
    (currentUser) => currentUser.id === Number(id)
  );

  if (!user) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          User Not Found
        </h1>

        <p className="mt-2 text-gray-600">
          The user you are looking for does not exist.
        </p>

        <Link
          to="/users"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-md">
      <h1 className="text-3xl font-bold text-blue-700">
        User Profile
      </h1>

      <div className="mt-6 rounded-lg bg-gray-50 p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {user.name}
        </h2>

        <p className="mt-3 text-gray-600">
          <span className="font-semibold">
            Email:
          </span>{" "}
          {user.email}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">
            Role:
          </span>{" "}
          {user.role}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">
            Status:
          </span>{" "}
          {user.isActive
            ? "Active"
            : "Inactive"}
        </p>
      </div>

      <Link
        to="/users"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        Back to Users
      </Link>
    </div>
  );
}

export default UserProfilePage;