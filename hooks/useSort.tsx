import { useRouter } from "next/router";
import { useState, useMemo } from "react";

type SortDirection = "asc" | "desc";

export type SortConfig = {
  key: string;
  direction: SortDirection;
};

const useSort = <T,>(data: T[], useQuerySort?: boolean) => {
  const { query, push, pathname } = useRouter();

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: (query.sortKey as string) ?? "",
    direction: (query.sortDir as SortDirection) ?? "asc",
  });

  const items = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const key = sortConfig.key as keyof T;
      const directionFactor = sortConfig.direction === "desc" ? 1 : -1;
      return a[key] > b[key] ? directionFactor : -directionFactor;
    });
  }, [data, sortConfig]);

  const handleSort = (key: string) => {
    if (useQuerySort) {
      const sortKey = key;
      const sortDir =
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      push({
        pathname,
        query: { ...query, sortKey, sortDir },
      });
    }
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return { items: useQuerySort ? data : items, sortConfig, handleSort };
};

export default useSort;
