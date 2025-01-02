import { createContext, useContext } from "react";

interface TableContextType<T> {
  items: T[];
}

const TableContext = createContext<TableContextType<unknown> | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export const TableProvider = TableContext.Provider;
