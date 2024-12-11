import { describe, expect, it } from "vitest";
import { formatDate } from "./date";

describe("Date Utils", () => {
  describe("formatDate()", () => {
    it("Should return properly formatted date", () => {
      expect(formatDate("2024-11-30T14:53:12")).toBe("2024-11-30");
    });
  });
});
