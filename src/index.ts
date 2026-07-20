import type {
  User,
  Session,
  Booking,
  StringOrNumber,
  ApiResponse,
  UserUpdate,
  BookingPreview,
  PublicUser,
  RoleCount,
} from "../types/index";
import { BookingStatus } from "../types/index";

const projectName: string = "peer-tutoring-platform";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

let anything: any = "hello";
anything = 42;
anything = true;

let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

function throwError(message: string): never {
  throw new Error(message);
}

const tutor: User = {
  id: 1,
  name: "Janna Alcantara",
  email: "janna@example.com",
  role: "tutor",
  isActive: true,
};

const tutee: User = {
  id: 2,
  name: "Mika Ortiz",
  email: "mika@example.com",
  role: "tutee",
  isActive: true,
};

const session: Session = {
  id: 1,
  tutorId: tutor.id,
  subject: "Calculus 1",
  durationMinutes: 60,
  ratePerHour: 300,
};

console.log(tutor);
console.log(tutee);
console.log(session);

function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

// ===== GT1 Part 2: Generic Functions =====
// T is inferred automatically from whatever array you pass in
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Constrained generic -- T must have an "id: number" field
function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

const booking: Booking = {
  id: 1,
  sessionId: session.id,
  tuteeId: tutee.id,
  status: BookingStatus.Requested,
  requestedAt: new Date(),
};

const firstBooking = getFirst<Booking>([booking]);
const foundBooking = getById<Booking>([booking], 1);

console.log(firstBooking?.status);
console.log(foundBooking?.sessionId);

// ===== GT1 Part 2: Using the Generic Interface =====
const bookingResponse: ApiResponse<Booking> = {
  success: true,
  data: booking,
};

console.log(bookingResponse.data.status);

// ===== GT1 Part 2: Using Utility Types =====
// Partial<T> -- update payload only needs the changed fields
const patch: UserUpdate = { name: "Janna A. Alcantara" };

// Pick<T,K> -- a lightweight preview object
const preview: BookingPreview = {
  id: 1,
  status: BookingStatus.Requested,
  requestedAt: new Date(),
};

// Omit<T,K> -- safe to expose publicly (no email, no isActive)
const publicProfile: PublicUser = {
  id: 1,
  name: "Janna Alcantara",
  role: "tutor",
};

// Record<K,T> -- dashboard-style counts
const roleCount: RoleCount = { tutor: 12, tutee: 38 };

console.log(patch, preview, publicProfile, roleCount);

// ReturnType<T> -- infer a type directly from a function, no need to redeclare it
function makeBooking(sessionId: number, tuteeId: number) {
  return {
    id: 2,
    sessionId,
    tuteeId,
    status: BookingStatus.Requested,
    requestedAt: new Date(),
  };
}

type NewBooking = ReturnType<typeof makeBooking>;
const gt1Booking: NewBooking = makeBooking(session.id, tutee.id);
console.log(gt1Booking);

// ===== GT1 Part 2: Using the Enum =====
let status: BookingStatus = BookingStatus.Requested;
console.log(BookingStatus[status]); // "Requested" -- reverse mapping

status = BookingStatus.Confirmed;
console.log(status === BookingStatus.Confirmed); // true

status = BookingStatus.Completed;
console.log(BookingStatus[status]); // "Completed"