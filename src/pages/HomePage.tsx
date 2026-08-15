import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-8 py-16 text-white shadow-xl md:px-14">
        <div className="max-w-3xl">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            🎓 Peer Tutoring Platform
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Learn from others.
            <br />
            Grow together.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Find helpful tutors, discover learning sessions, and manage
            your tutoring bookings in one simple platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/users"
              className="rounded-xl bg-white px-6 py-3 font-bold text-blue-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              Find a Tutor →
            </Link>

            <Link
              to="/sessions"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Browse Sessions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="text-3xl">👨‍🏫</div>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            1+
          </p>
          <p className="mt-1 text-slate-500">
            Available Tutors
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="text-3xl">📚</div>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            1+
          </p>
          <p className="mt-1 text-slate-500">
            Tutoring Sessions
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="text-3xl">⭐</div>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            100%
          </p>
          <p className="mt-1 text-slate-500">
            Learning Focus
          </p>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-6">
          <p className="font-semibold text-blue-600">
            WHY USE PEER TUTORING?
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Everything you need to learn better
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              🔎
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Find Tutors
            </h3>

            <p className="mt-2 leading-7 text-slate-500">
              Discover tutors who can help you understand
              difficult subjects.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
              📖
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Book Sessions
            </h3>

            <p className="mt-2 leading-7 text-slate-500">
              Choose a tutoring session that matches your
              learning needs.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
              ✅
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Track Bookings
            </h3>

            <p className="mt-2 leading-7 text-slate-500">
              Keep track of your tutoring bookings and their
              current status.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;