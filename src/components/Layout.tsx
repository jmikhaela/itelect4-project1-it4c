import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  function handleLogout(): void {
    logout();
    navigate("/login");
  }

  function isActive(path: string): boolean {
    return location.pathname === path;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-md">
              PT
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Peer Tutoring
              </h1>
              <p className="text-xs text-slate-500">
                Learn. Connect. Grow.
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Home
            </Link>

            <Link
              to="/users"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/users")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Tutors
            </Link>

            <Link
              to="/sessions"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/sessions")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Sessions
            </Link>

            <Link
              to="/bookings"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/bookings")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              My Bookings
            </Link>
          </div>

          {/* Authentication */}
          <div className="flex items-center gap-3">
            {token ? (
              <>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-slate-800">
                    Janna Alcantara
                  </p>
                  <p className="text-xs text-slate-500">
                    Student
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-6 py-3 md:hidden">
          <Link
            to="/"
            className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium"
          >
            Home
          </Link>

          <Link
            to="/users"
            className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium"
          >
            Tutors
          </Link>

          <Link
            to="/sessions"
            className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium"
          >
            Sessions
          </Link>

          <Link
            to="/bookings"
            className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium"
          >
            Bookings
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto min-h-[calc(100vh-80px)] max-w-7xl px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 Peer Tutoring Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;