import type {
  Session,
  Booking,
  NewBooking,
  Course,
  ApiSubmission,
  NewSubmission,
  AuthReply,
  ApiUser,
  AiReview,
} from "../types/index";
import useAuthStore from "../store/authStore";

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, " +
      "and restart npm run dev."
  );
}

// Every call goes through here: the host, the JSON header, the token
// when there is one, and the API's own message when it refuses.
async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const baseUrl = API_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${baseUrl}${cleanPath}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return res.json();
}

// ---- sessions: public. request() sends no token, and none is needed.
export function fetchSessions(): Promise<Session[]> {
  return request<Session[]>("/api/sessions");
}

export function fetchSessionById(
  id: number | string
): Promise<Session> {
  return request<Session>(`/api/sessions/${id}`);
}

// ---- courses: public reference data
export function fetchCourses(): Promise<Course[]> {
  return request<Course[]>("/api/courses");
}

export function fetchCourseByCode(code: string): Promise<Course> {
  return request<Course>(`/api/courses/${code}`);
}

// ---- bookings: private. The token goes on automatically.
export interface CreateBookingData {
  sessionId: number | string;
  time: string;
  durationMinutes: number;
}

export function fetchBookings(): Promise<Booking[]> {
  return request<Booking[]>("/api/bookings");
}

export function createBooking(
  booking: CreateBookingData | NewBooking
): Promise<Booking> {
  return request<Booking>("/api/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
  });
}

export function deleteBooking(
  id: string | number
): Promise<void> {
  return request<void>(`/api/bookings/${id}`, {
    method: "DELETE",
  });
}

// ---- submissions: private
export function fetchSubmissions(): Promise<ApiSubmission[]> {
  return request<ApiSubmission[]>("/api/submissions");
}

export function createSubmission(
  newSubmission: NewSubmission
): Promise<ApiSubmission> {
  return request<ApiSubmission>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(newSubmission),
  });
}

// ---- auth: the two routes that make a session exist
export function registerUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ===== SESSION 11: one more private call ===============================
// ---- ai: private, like submissions. The token goes on automatically,
// which matters more here than anywhere: without it, anyone could
// spend your Gemini quota.
export function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}

