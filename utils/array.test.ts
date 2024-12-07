import { describe, expect, it } from "vitest";
import { getHighestNumber, getLowestNumber } from "./array";

describe("Array Utils", () => {
  const arr = [
    { value: 1 },
    { value: 228 },
    { value: 5 },
    { value: 150 },
    { value: 1337 },
    { value: 0 },
    { value: 9 },
  ];

  describe("getHighestNumber()", () => {
    it("should return the highest number", () => {
      expect(getHighestNumber(arr, "value")).toBe(1337);
    });
  });

  describe("getLowestNumber()", () => {
    it("should return the highest number", () => {
      expect(getLowestNumber(arr, "value")).toBe(0);
    });
  });
});
