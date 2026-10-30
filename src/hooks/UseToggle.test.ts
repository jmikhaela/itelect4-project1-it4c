// ===== SESSION 12: Test 2 of 3 (Custom Hook test) =====================
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useToggle from "./UseToggle";

describe("useToggle", () => {
  it("starts at the initial value given", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
  });

  it("flips the value each time toggle is called", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });
});
