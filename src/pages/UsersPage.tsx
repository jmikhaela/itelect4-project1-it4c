import { useNavigate } from "react-router-dom";
import type { User } from "../types/index";

function UsersPage() {
  const navigate = useNavigate();

  const tutors: User[] = [
    {
      id: 1,
      name: "Janna Mikhaela",
      email: "jannamikhaela@example.com",
      role: "tutor",
      isActive: true,
    },
  ];

  function handleSelectTutor(id: number): void {
    navigate(`/users/${id}`);
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Peer Tutoring
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Our Tutors
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Meet our tutors and find someone who can help you
          achieve your learning goals.
        </p>
      </div>

      {/* Tutor Section */}
      <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Available Tutors
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {tutors.length} tutor available
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          🎓 Find Your Tutor
        </div>
      </div>

      {/* Tutor Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor: User) => (
          <div
            key={tutor.id}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-700 shadow-md">
                  JM
                </div>

                <div>
                  <p className="text-sm text-blue-100">
                    Tutor
                  </p>

                  <h3 className="text-2xl font-bold">
                    {tutor.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">

              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {tutor.email}
                </p>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="text-sm font-medium text-green-600">
                  Available
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleSelectTutor(tutor.id)}
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
              >
                View Tutor Profile →
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;