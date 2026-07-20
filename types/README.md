# Peer-tutoring-platform

A TypeScript practice project for ITELECT4: a peer tutoring booking platform
where tutors offer sessions and tutees book them. A booking moves through a
clear lifecycle -- requested, confirmed, completed. Built up across GT1 Part 1
(interfaces, unions, type narrowing) and GT1 Part 2 (generics, utility types,
enums).

## Types Defined

- `User` -- a person using the platform (`tutor` or `tutee`)
- `Session` -- a tutoring offering (subject, duration, hourly rate) posted by a tutor
- `Booking` -- a tutee's booking of a session, with a `BookingStatus` lifecycle
- `ID`, `StringOrNumber` -- reusable type aliases
- `AvailabilityStatus` -- literal union (`"available" | "busy" | "offline"`)
- `TutorWithSessions` -- intersection of `User` and a tutor's sessions/rating
- `ApiResponse<T>` -- generic wrapper for any API response shape
- `UserUpdate` (`Partial<User>`) -- update payload with only changed fields
- `BookingPreview` (`Pick<Booking, ...>`) -- lightweight preview object
- `PublicUser` (`Omit<User, ...>`) -- safe-to-expose profile, no email/isActive
- `RoleCount` (`Record<...>`) -- dashboard-style counts per role
- `BookingStatus` -- enum (`Requested`, `Confirmed`, `Completed`)

## How to Install and Run

```bash
npm install
npx ts-node src/index.ts
```

To type-check without emitting JS:

```bash
npx tsc --noEmit
```