import { describe, expect, it } from "vitest";
import { defaultMaxHCP, getHCP } from "./swebowl";

describe("Swebowl Utils", () => {
  describe("getHCP()", () => {
    const baseline = 228;
    it("should return a max value", () => {
      expect(getHCP(baseline, 10, undefined, 50)).toBe(50);
    });
    it("should return a default max value", () => {
      expect(getHCP(baseline, 10)).toBe(defaultMaxHCP);
    });
    it("should return 0 if strength is above or equal to baseline", () => {
      expect(getHCP(baseline, baseline)).toBe(0);
      expect(getHCP(baseline, baseline + 1)).toBe(0);
    });
    it("should return 0 if strength is above or equal to baseline no matter what max hcp is", () => {
      expect(getHCP(baseline, baseline, undefined, 100)).toBe(0);
      expect(getHCP(baseline, baseline + 1, undefined, 5)).toBe(0);
    });
    it("should return a hcp value", () => {
      expect(getHCP(baseline, 193.62)).toBe(24);
    });
    it("should return a hcp value (with percentage)", () => {
      expect(getHCP(baseline, 194, 90)).toBe(31);
    });
    it("should return a hcp value (with max hcp)", () => {
      expect(getHCP(baseline, 193.62, undefined, 20)).toBe(20);
    });
  });
});
