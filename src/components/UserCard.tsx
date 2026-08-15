import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (id: number) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Card Header */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-12 flex items-end justify-between">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-md">
            {user.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          {/* Status */}
          <span
            className={`mb-2 rounded-full px-3 py-1 text-xs font-semibold ${
              user.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span className="mr-1">●</span>
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* User Information */}
        <div className="mt-5">
          <h3 className="text-xl font-bold text-slate-900">
            {user.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {user.email}
          </p>

          <div className="mt-4 inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold capitalize text-blue-700">
            🎓 {user.role}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Button */}
        <button
          type="button"
          onClick={() => onSelect(user.id)}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
        >
          View Profile →
        </button>
      </div>
    </div>
  );
}

export default UserCard;