import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (id: number) => void;
}

function UserCard({
  user,
  onSelect,
}: UserCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800">
        {user.name}
      </h3>

      <p className="mt-2 text-gray-600">
        {user.email}
      </p>

      <p className="mt-1 text-gray-600">
        Role: {user.role}
      </p>

      <p className="text-gray-600">
        Status:{" "}
        <span
          className={
            user.isActive
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </p>

      <button
        type="button"
        onClick={() => onSelect(user.id)}
        className="mt-4 w-full rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
      >
        View Profile
      </button>
    </div>
  );
}

export default UserCard;